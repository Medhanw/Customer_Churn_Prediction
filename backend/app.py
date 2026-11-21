
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from pathlib import Path
import pandas as pd
import numpy as np
import joblib
import json

# ==========================================
# 1. INITIALIZE API
# ==========================================

app = FastAPI(
    title="Customer Churn Prediction API",
    description="ML-powered Customer Churn Prediction System",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ==========================================
# 2. LOAD MODEL AND FEATURE COLUMNS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "Models" / "customer_churn_model.pkl"
FEATURE_PATH = BASE_DIR / "Models" / "feature_columns.json"
METADATA_PATH = BASE_DIR / "Models" / "model_metadata.pkl"

model = joblib.load(MODEL_PATH)

with open(FEATURE_PATH, "r") as file:
    feature_columns = json.load(file)

print("ML Pipeline loaded successfully!")
print("Total model features:", len(feature_columns))

# ==========================================
# 3. RAW CUSTOMER INPUT FEATURES
# ==========================================

raw_features = [
    "gender",
    "SeniorCitizen",
    "Partner",
    "Dependents",
    "tenure",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges"
]

service_columns = [
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies"
]

# ==========================================
# 4. REQUEST MODEL
# ==========================================

class CustomerData(BaseModel):
    customer_id: str | None = None
    features: Dict[str, Any]


# ==========================================
# 5. FEATURE ENGINEERING
# ==========================================

def engineer_features(customer_features):

    missing = [
        col for col in raw_features
        if col not in customer_features
    ]

    if missing:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Missing required customer features",
                "missing_features": missing
            }
        )

    df = pd.DataFrame([customer_features])[raw_features].copy()

    # Convert numerical features
    numeric_columns = [
        "SeniorCitizen",
        "tenure",
        "MonthlyCharges",
        "TotalCharges"
    ]

    for col in numeric_columns:
        df[col] = pd.to_numeric(
            df[col],
            errors="coerce"
        )

    # TenureGroup: five categories
    df["TenureGroup"] = pd.cut(
        df["tenure"],
        bins=[0, 12, 24, 48, 60, 72],
        labels=[
            "0-12 Months",
            "13-24 Months",
            "25-48 Months",
            "49-60 Months",
            "61-72 Months"
        ],
        include_lowest=True
    )

    # TotalServices
    df["TotalServices"] = (
        df[service_columns] == "Yes"
    ).sum(axis=1)

    # HasTechSupport
    df["HasTechSupport"] = (
        df["TechSupport"] == "Yes"
    ).astype(int)

    # TenureCategory
    df["TenureCategory"] = pd.cut(
        df["tenure"],
        bins=[-1, 12, 24, 48, 72],
        labels=["New", "Medium", "Long", "Loyal"]
    )

    # AverageMonthlySpending
    df["AverageMonthlySpending"] = (
        df["TotalCharges"] /
        df["tenure"].replace(0, np.nan)
    )

    # AdditionalServicesCount
    df["AdditionalServicesCount"] = (
        df[service_columns] == "Yes"
    ).sum(axis=1)

    # ChargesCategory
    df["ChargesCategory"] = pd.cut(
        df["MonthlyCharges"],
        bins=[-np.inf, 35, 70, 100, np.inf],
        labels=["Low", "Medium", "High", "Very High"]
    )

    # Ensure the model receives exactly its training columns
    df = df[feature_columns]

    return df


# ==========================================
# 6. HOME ENDPOINT
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Customer Churn Prediction API",
        "status": "Running",
        "model": "Loaded",
        "total_features": len(feature_columns)
    }


# ==========================================
# 7. MODEL INFORMATION
# ==========================================

@app.get("/model-info")
def model_info():

    try:
        metadata = joblib.load(METADATA_PATH)
        return metadata

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ==========================================
# 8. CUSTOMER CHURN PREDICTION
# ==========================================

@app.post("/predict")
def predict_churn(customer: CustomerData):

    try:

        # Generate all 26 model features
        input_data = engineer_features(
            customer.features
        )

        # Model prediction
        prediction = model.predict(input_data)[0]

        # Churn probability
        probabilities = model.predict_proba(input_data)[0]

        classes = list(model.classes_)

        churn_index = classes.index(1)

        churn_probability = float(
            probabilities[churn_index]
        ) * 100

        # Risk classification
        if churn_probability >= 70:
            risk_category = "High"
        elif churn_probability >= 40:
            risk_category = "Medium"
        else:
            risk_category = "Low"

        return {
            "customer_id": customer.customer_id,
            "prediction": int(prediction),
            "prediction_label": (
                "Churn" if int(prediction) == 1
                else "No Churn"
            ),
            "churn_probability": round(
                churn_probability, 2
            ),
            "risk_category": risk_category,
            "model": "Gradient Boosting"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

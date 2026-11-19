
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from pathlib import Path
import pandas as pd
import joblib
import json

# =====================================
# INITIALIZE APPLICATION
# =====================================

app = FastAPI(
    title="Customer Churn Prediction API",
    description="Machine Learning powered customer churn prediction",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# LOAD SAVED MODEL
# =====================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "Models" / "customer_churn_model.pkl"

FEATURE_PATH = BASE_DIR / "Models" / "feature_columns.json"

model = joblib.load(MODEL_PATH)

with open(FEATURE_PATH, "r") as file:
    feature_columns = json.load(file)

print("ML model loaded successfully!")

# =====================================
# REQUEST STRUCTURE
# =====================================

class CustomerData(BaseModel):
    customer_id: str | None = None
    features: Dict[str, Any]

# =====================================
# HOME ENDPOINT
# =====================================

@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API",
        "status": "Running",
        "model": "Loaded"
    }

# =====================================
# MODEL INFORMATION
# =====================================

@app.get("/model-info")
def model_info():

    metadata = joblib.load(
        BASE_DIR / "Models" / "model_metadata.pkl"
    )

    return metadata

# =====================================
# CUSTOMER CHURN PREDICTION
# =====================================

@app.post("/predict")
def predict_churn(customer: CustomerData):

    try:

        missing = [
            col for col in feature_columns
            if col not in customer.features
        ]

        if missing:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Missing required features",
                    "missing_features": missing
                }
            )

        input_data = pd.DataFrame(
            [customer.features],
            columns=feature_columns
        )

        prediction = model.predict(input_data)[0]

        probabilities = model.predict_proba(input_data)[0]

        classes = list(model.classes_)

        positive_classes = [
            "yes", "1", "true", "churn", "churned"
        ]

        positive_index = next(
            (
                i for i, cls in enumerate(classes)
                if str(cls).strip().lower() in positive_classes
            ),
            None
        )

        if positive_index is None:
            raise ValueError(
                f"Could not identify churn class: {classes}"
            )

        churn_probability = float(
            probabilities[positive_index]
        )

        return {
            "customer_id": customer.customer_id,
            "prediction": str(prediction),
            "churn_probability": round(
                churn_probability * 100, 2
            ),
            "model": "Gradient Boosting"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

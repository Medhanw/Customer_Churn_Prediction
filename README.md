# 📊 Customer Churn Prediction

### Understanding Customer Behaviour Through Data Science and Machine Learning

![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)
![Pandas](https://img.shields.io/badge/Pandas-Data_Analysis-150458?logo=pandas)
![NumPy](https://img.shields.io/badge/NumPy-Scientific_Computing-013243?logo=numpy)
![Status](https://img.shields.io/badge/Project-In_Progress-orange)

## 📌 Project Overview

Customer retention is one of the biggest challenges faced by subscription-based businesses, particularly in the telecommunications industry.

Losing customers directly affects revenue, profitability, and long-term business growth. Understanding why customers leave and identifying customers who are likely to discontinue their services can help businesses take proactive retention measures.

This project focuses on analyzing customer data, discovering patterns associated with customer churn, and developing a Machine Learning model to predict whether a customer is likely to leave a telecom service provider.

The ultimate goal is to transform raw customer data into meaningful business insights and actionable predictions.

## 🎯 Project Objectives

- Understand customer demographics, service usage, and billing behaviour.
- Perform Exploratory Data Analysis (EDA) to identify churn patterns.
- Clean and preprocess raw customer data.
- Identify important factors associated with customer attrition.
- Build and evaluate Machine Learning classification models.
- Predict customers who are likely to churn.
- Generate insights that can help businesses improve customer retention.

## 📂 Dataset

The project uses a Telco Customer Churn dataset containing 7,043 customer records and 21 attributes.

The dataset includes:

| Category | Attributes |
|---|---|
| Customer Information | Gender, SeniorCitizen, Partner, Dependents |
| Account Information | Tenure, Contract, PaperlessBilling, PaymentMethod |
| Services | PhoneService, InternetService, OnlineSecurity, TechSupport |
| Billing Information | MonthlyCharges, TotalCharges |
| Target Variable | Churn |

**Target Variable:**
- Yes – Customer has discontinued the service.
- No – Customer continues using the service.

## 📚 Dataset Source & Attribution

Dataset: Telco Customer Churn

File: `WA_Fn-UseC_-Telco-Customer-Churn.csv`

Records: 7,043 customers

Features: 21 columns

Source:https://www.kaggle.com/datasets/blastchar/telco-customer-churn

The dataset is used for educational and portfolio development purposes. Please refer to the original source for its applicable licence and usage terms.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Programming language |
| Jupyter Notebook | Development environment |
| Pandas | Data manipulation and analysis |
| NumPy | Numerical computing |
| Matplotlib | Data visualization |
| Seaborn | Statistical visualization |
| Scikit-learn | Machine Learning and model evaluation |

## ⚙️ Project Workflow

The project follows a structured Data Science workflow:

1. Data Collection and Loading
2. Data Understanding
3. Data Cleaning and Preprocessing
4. Exploratory Data Analysis
5. Feature Engineering
6. Feature Selection
7. Model Building
8. Model Evaluation
9. Prediction and Business Recommendations

## 🔍 Work Completed

### 1. Data Understanding
- Loaded the dataset using Pandas.
- Examined dataset dimensions and column names.
- Investigated data types and data distribution.
- Analyzed the target variable.

### 2. Data Cleaning
- Identified 11 blank values in the TotalCharges column.
- Converted TotalCharges from object to numerical format.
- Investigated missing values and identified zero-tenure customers.
- Replaced the 11 missing TotalCharges values with zero based on the customer tenure information.
- Checked duplicate records.
- Verified that all 7,043 customer records were retained.

### 3. Initial Data Analysis

The initial churn distribution revealed:

- 5,174 customers (73.46%) did not churn.
- 1,869 customers (26.54%) churned.

This indicates an imbalanced target distribution that will be considered during model development and evaluation.

## 🚀 Upcoming Implementation

- Complete Exploratory Data Analysis.
- Analyze relationships between customer characteristics and churn.
- Perform feature encoding and preprocessing.
- Split the dataset into training and testing sets.
- Implement classification algorithms such as:
  - Logistic Regression
  - Decision Tree
  - Random Forest
  - Support Vector Machine
- Evaluate models using Accuracy, Precision, Recall, F1-score and ROC-AUC.
- Compare model performance and select an appropriate model.
- Develop a customer churn prediction interface.

## 📈 Expected Outcome

The expected outcome is a Machine Learning classification model capable of identifying customers who are at risk of leaving a telecom service provider.

The project also aims to uncover meaningful customer behaviour patterns and provide data-driven recommendations to improve customer retention.

## 📁 Repository Structure

```text
Customer_Churn_Prediction/
│
├── Customer_Churn_Prediction.ipynb
│
├── customer_churn_cleaned.csv
│
└── README.md
```

## 💡 Business Impact

A reliable customer churn prediction system can help businesses:

- Identify customers at high risk of leaving.
- Design targeted customer retention campaigns.
- Improve customer satisfaction.
- Reduce customer acquisition costs.
- Make informed, data-driven business decisions.

## 📍 Project Development Status

| Module | Status |
|---|---|
| Data Collection | Completed |
| Data Understanding | Completed |
| Data Cleaning | Completed |
| Exploratory Data Analysis | In Progress |
| Feature Engineering | Upcoming |
| Machine Learning Models | Upcoming |
| Model Evaluation | Upcoming |
| Explainable AI (SHAP) | Upcoming |
| Streamlit Deployment | Upcoming |

### Development Roadmap

The project is being developed incrementally, with an emphasis on understanding the complete Data Science lifecycle, maintaining reproducible workflows, and translating analytical findings into business recommendations.

## 👩‍💻 Author

**Medha Wadekar**

Computer Science Engineering | AI & Analytics

Interested in Data Science, Artificial Intelligence, Machine Learning, and building data-driven solutions.

---

⭐ This project is currently under development. More analysis, experiments, and Machine Learning implementations will be added as the project progresses.

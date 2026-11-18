## Exploratory Data Analysis – Key Findings

The Exploratory Data Analysis (EDA) was conducted to understand customer characteristics, identify patterns in customer behaviour, and investigate factors potentially associated with customer churn.


# Exploratory Data Analysis - Key Findings

## 1. Dataset Overview
- Total customers: 7,043
- Total features: 24 (including engineered features)
- Churned customers: 1,869
- Retained customers: 5,174
- Overall churn rate: 26.54%

## 2. Customer Behaviour
- Customers with shorter tenure show higher churn tendency.
- Month-to-month contracts are an important segment to investigate.
- Monthly charges may influence customer retention.
- Payment methods and additional services show differences in churn behaviour.

## 3. Numerical Analysis
- Churned customers have shorter average tenure.
- Churned customers have higher average monthly charges.
- Tenure and TotalCharges have an important relationship.

## 4. Business Recommendations
- Introduce loyalty programmes for new customers.
- Offer incentives for long-term contracts.
- Identify customers with high monthly charges.
- Improve technical support and online security services.
- Develop targeted customer retention campaigns.

## 5. EDA Conclusion
EDA helped identify customer characteristics and
service-related patterns associated with churn.

These findings will guide feature engineering
and machine learning model development.


### Key Observations

1. **Customer Churn Distribution:** Approximately 26.5% of customers have discontinued their services, indicating a significant customer retention challenge.

2. **Contract Type:** Month-to-month customers demonstrate considerably higher churn counts compared with customers having one-year or two-year contracts.

3. **Monthly Charges:** Customers who churned appear to have higher median monthly charges than customers who stayed.

4. **Customer Tenure:** Customers with shorter subscription durations appear more vulnerable to churn, suggesting the importance of early customer engagement.

5. **Payment Method:** Electronic check users account for a comparatively higher number of churned customers.

6. **Feature Correlation:** Numerical feature relationships were investigated using a correlation heatmap to identify potential relationships and redundancy.

### Conclusion

The EDA identified several customer characteristics associated with churn, including contract type, monthly charges, tenure, and payment method.

These findings will guide subsequent feature engineering, feature selection, and machine learning model development.

Further statistical testing and model-based analysis will be used to investigate the predictive importance of these features.

# Feature Engineering and Feature Selection

Feature engineering is the process of creating and transforming variables to improve the predictive capabilities of machine learning models.

In this stage, we will:
1. Identify numerical and categorical features.
2. Remove irrelevant columns.
3. Create meaningful customer behaviour features.
4. Encode categorical variables.
5. Scale numerical variables where required.
6. Select relevant features for model development.
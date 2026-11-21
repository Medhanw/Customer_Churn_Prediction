
import { useState } from "react";
import axios from "axios";
import "./Prediction.css";

const API_URL = "http://127.0.0.1:8000";

const initialForm = {
    gender: "Female",
    SeniorCitizen: 0,
    Partner: "Yes",
    Dependents: "No",
    tenure: 12,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "DSL",
    OnlineSecurity: "No",
    OnlineBackup: "Yes",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 55.5,
    TotalCharges: 650
};

function Prediction() {
    const [form, setForm] = useState(initialForm);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const updateField = (name, value) => {
    setForm((previous) => ({
        ...previous,
        [name]: value
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
        const response = await axios.post(
        `${API_URL}/predict`,
        {
            customer_id: "NEW-CUSTOMER",
            features: {
            ...form,
            SeniorCitizen: Number(form.SeniorCitizen),
            tenure: Number(form.tenure),
            MonthlyCharges: Number(form.MonthlyCharges),
            TotalCharges: Number(form.TotalCharges)
        }
        }
    );
    
    setResult(response.data);
    } catch (err) {
        setError(
        err.response?.data?.detail
          ? JSON.stringify(err.response.data.detail)
          : "Unable to connect to prediction API."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderSelect = (label, name, options) => (
    <div className="prediction-field" key={name}>
      <label>{label}</label>
      <select
        value={form[name]}
        onChange={(e) => updateField(name, e.target.value)}
      >
        {options.map((option) => (
          <option key={String(option)} value={option}>
            {String(option)}
          </option>
        ))}
      </select>
    </div>
  );

  const renderNumber = (label, name, min = 0, step = 1) => (
    <div className="prediction-field" key={name}>
      <label>{label}</label>
      <input
        type="number"
        min={min}
        step={step}
        value={form[name]}
        onChange={(e) => updateField(name, e.target.value)}
        required
      />
    </div>
  );

  return (
    <div className="prediction-page">
      <div className="prediction-heading">
        <h1>Customer Churn Prediction</h1>
        <p>Enter customer information to assess churn risk.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="prediction-card">
          <h2>Personal Information</h2>
          <div className="prediction-grid">
            {renderSelect("Gender", "gender", ["Female", "Male"])}
            {renderSelect("Senior Citizen", "SeniorCitizen", [0, 1])}
            {renderSelect("Partner", "Partner", ["Yes", "No"])}
            {renderSelect("Dependents", "Dependents", ["Yes", "No"])}
            {renderNumber("Tenure (months)", "tenure", 0)}
          </div>
        </div>

        <div className="prediction-card">
          <h2>Services Information</h2>
          <div className="prediction-grid">
            {renderSelect("Phone Service", "PhoneService", ["Yes", "No"])}
            {renderSelect("Multiple Lines", "MultipleLines", ["No phone service", "No", "Yes"])}
            {renderSelect("Internet Service", "InternetService", ["DSL", "Fiber optic", "No"])}
            {renderSelect("Online Security", "OnlineSecurity", ["No", "Yes", "No internet service"])}
            {renderSelect("Online Backup", "OnlineBackup", ["No", "Yes", "No internet service"])}
            {renderSelect("Device Protection", "DeviceProtection", ["No", "Yes", "No internet service"])}
            {renderSelect("Tech Support", "TechSupport", ["No", "Yes", "No internet service"])}
            {renderSelect("Streaming TV", "StreamingTV", ["No", "Yes", "No internet service"])}
            {renderSelect("Streaming Movies", "StreamingMovies", ["No", "Yes", "No internet service"])}
          </div>
        </div>

        <div className="prediction-card">
          <h2>Billing Information</h2>
          <div className="prediction-grid">
            {renderSelect("Contract", "Contract", ["Month-to-month", "One year", "Two year"])}
            {renderSelect("Paperless Billing", "PaperlessBilling", ["Yes", "No"])}
            {renderSelect("Payment Method", "PaymentMethod", [
              "Electronic check",
              "Mailed check",
              "Bank transfer (automatic)",
              "Credit card (automatic)"
            ])}
            {renderNumber("Monthly Charges", "MonthlyCharges", 0, 0.01)}
            {renderNumber("Total Charges", "TotalCharges", 0, 0.01)}
          </div>
        </div>

        <button
          className="predict-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Analyzing Customer..." : "Predict Churn Risk"}
        </button>
      </form>

      {error && <div className="prediction-error">{error}</div>}

      {result && (
        <div className="prediction-result">
          <h2>Prediction Result</h2>
          <p>
            Customer: <strong>{result.customer_id}</strong>
          </p>
          <p>
            Prediction: <strong>{result.prediction_label}</strong>
          </p>
          <p>
            Churn Probability:{" "}
            <strong>{result.churn_probability}%</strong>
          </p>
          <p>
            Risk Category: <strong>{result.risk_category}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Prediction;

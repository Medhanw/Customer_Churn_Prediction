
import { useEffect, useState } from "react";
import axios from "axios";

import {
  LayoutDashboard,
  Users,
  ChartColumn,
  BrainCircuit,
  Settings,
  Bell,
  Activity,
  ShieldAlert,
  TrendingUp,
  UserPlus,
  ArrowLeft
} from "lucide-react";

import Prediction from "./Prediction";
import "./App.css";

const API = "http://127.0.0.1:8000";

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [modelInfo, setModelInfo] = useState(null);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const health = await axios.get(`${API}/`);
        setApiStatus(health.data.status);

        const model = await axios.get(`${API}/model-info`);
        setModelInfo(model.data);

      } catch {
        setApiStatus("Disconnected");
        setError("Unable to connect to the backend.");
      }
    }

    loadDashboard();
  }, []);

  const metrics = [
    {
      title: "Total Customers",
      value: "—",
      icon: Users,
      color: "blue"
    },
    {
      title: "High Risk Customers",
      value: "—",
      icon: ShieldAlert,
      color: "red"
    },
    {
      title: "Churn Rate",
      value: "—",
      icon: TrendingUp,
      color: "orange"
    },
    {
      title: "Model ROC-AUC",
      value: modelInfo?.roc_auc != null
        ? Number(modelInfo.roc_auc).toFixed(4)
        : "—",
      icon: BrainCircuit,
      color: "purple"
    }
  ];

  const navigation = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      page: "dashboard"
    },
    {
      name: "Predict Churn",
      icon: UserPlus,
      page: "prediction"
    }
  ];

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2 className="brand">
          <BrainCircuit /> ChurnIQ
        </h2>

        <p className="menu-label">WORKSPACE</p>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.page}
                href="#"
                className={activePage === item.page ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage(item.page);
                }}
              >
                <Icon />
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            <Settings /> Settings
          </a>
        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>
              {activePage === "dashboard"
                ? "Customer Analytics"
                : "Customer Prediction"}
            </h1>

            <p>
              Customer Churn Prediction & Retention Intelligence
            </p>
          </div>

          <div className="header-actions">
            <span className="api-status">
              <span className={
                apiStatus === "Running"
                  ? "dot online"
                  : "dot offline"
              }></span>
              API: {apiStatus}
            </span>
            <Bell />
          </div>
        </header>

        {activePage === "dashboard" ? (

          <>
            <section className="welcome">
              <div>
                <h2>Customer Churn Overview</h2>
                <p>
                  Monitor customer behaviour, identify churn risks
                  and understand retention opportunities.
                </p>
              </div>
              <Activity size={42} />
            </section>

            <section className="metrics-grid">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div className="metric-card" key={metric.title}>
                    <div className={`metric-icon ${metric.color}`}>
                      <Icon size={23} />
                    </div>

                    <p>{metric.title}</p>
                    <h2>{metric.value}</h2>
                  </div>
                );
              })}
            </section>

            <section className="content-grid">

              <div className="panel">
                <h3>Churn Analytics</h3>
                <p>Customer behaviour and churn distribution</p>

                <div className="empty-state">
                  <ChartColumn size={42} />
                  <h3>Analytics coming next</h3>
                  <p>
                    We will connect your actual customer
                    visualizations and analytics here.
                  </p>
                </div>
              </div>

              <div className="panel">
                <h3>Machine Learning Model</h3>
                <p>Current prediction engine</p>

                {modelInfo ? (
                  <div className="model-details">
                    <div>
                      <span>Model</span>
                      <strong>
                        {modelInfo.model_name || "Gradient Boosting"}
                      </strong>
                    </div>

                    {[
                      "accuracy",
                      "precision",
                      "recall",
                      "f1_score",
                      "roc_auc"
                    ].map((key) => (
                      <div key={key}>
                        <span>{key.replace("_", " ").toUpperCase()}</span>
                        <strong>
                          {modelInfo[key] != null
                            ? Number(modelInfo[key]).toFixed(4)
                            : "N/A"}
                        </strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    {error || "Loading model information..."}
                  </div>
                )}
              </div>

            </section>
          </>

        ) : (

          <section className="page-container">
            <button
              className="back-button"
              onClick={() => setActivePage("dashboard")}
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </button>

            <Prediction />
          </section>

        )}

        <footer>
          ChurnIQ | AI-Powered Customer Retention Platform
        </footer>

      </main>
    </div>
  );
}

export default App;

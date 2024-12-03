import React from "react";
import "../Styles/NotAuthorized.css";
import { useNavigate } from "react-router-dom";

export default function NotAuthorizedPage() {
  const navigate = useNavigate();
  const handleGoHome = () => {
      navigate("/");
  };

  return (
    <div className="not-authorized-page">
      <h1>403 - Not Authorized</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={handleGoHome} className="go-back-button">
        Go Home
      </button>
    </div>
  );
}

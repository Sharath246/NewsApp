import React from "react";
import "../Styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div>
      <div className="spinner-container">
        <div className="spinner"></div>
        Loading your content
      </div>
    </div>
  );
};

export default LoadingSpinner;

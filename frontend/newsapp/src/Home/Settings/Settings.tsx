import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [verificationStatus, setVerificationStatus] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Settings Saved:", {
      username,
      email,
      personalInfo,
      newPassword,
    });
    // Logic to update the settings
  };

  const handleVerification = () => {
    console.log("Verification email sent.");
    setVerificationStatus(true);
  };

  return (
    <div className="settings-page">
      <h1>User Settings</h1>

      {/* Personal Information Section */}
      <div className="section">
        <h2>Personal Information</h2>
        <form onSubmit={handleFormSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, firstName: e.target.value })
              }
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, lastName: e.target.value })
              }
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, phone: e.target.value })
              }
              placeholder="Enter your phone number"
            />
          </div>
        </form>
      </div>

      {/* Email Verification Section */}
      <div className="section">
        <h2>Email Verification</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p>{email}</p>
        </div>
        <button onClick={handleVerification} className="verify-button">
          {verificationStatus ? "Verification Sent" : "Verify Email"}
        </button>
      </div>

      {/* Change Password Section */}
      <div className="section">
        <h2>Change Password</h2>
        <form onSubmit={handleFormSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

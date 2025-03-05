import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/registerUser.ts";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError(true);
    } else {
      const value = await registerUser(email, password, name);
      if (value === "Success") {
        if (remember) {
          localStorage.setItem("User", name);
          localStorage.setItem("Email", email);
          localStorage.setItem("UserTopics", "");
        }
        sessionStorage.setItem("User", name);
        sessionStorage.setItem("Email", email);
        sessionStorage.setItem("UserTopics", "");
        navigation("/");
      } else if (value === "Failure") {
      } else navigation("/404Error");
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user !== null) navigation("/");
  }, [navigation]);

  return (
    <div className="login-screen">
      <div className="form-container">
        <h2>Register</h2>
        <form method="post" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              id="name"
              value={name}
              name="name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter new Password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => {
                setconfirmPassword(e.target.value);
                setError(false);
              }}
              placeholder="Confirm New Password"
            />
            {error && (
              <p style={{ color: "red" }}>* The Passwords dont match.</p>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              id="checkbox"
              name="chekkbox"
              onChange={(e) => {
                setRemember(e.target.checked);
              }}
            />
            <label style={{ display: "inline", marginLeft: "2%" }}>
              Remember Me
            </label>
          </div>
          <div className="login-footer">
            <button type="submit" className="submit-btn">
              Register
            </button>
            <div>
              Have an Account?&nbsp;<Link to="/login">login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useNavigate, Link } from "react-router-dom";
import React from "react";
import "./Login.css";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorWP, setWPError] = useState(false);
  const [errorNR, setNRError] = useState(false);
  const navigation = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    const url = "http://localhost:8080/login";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: email,
          password: password,
        },
      });
      const val = await response.text();
      console.log(val);
      if (val === "Not Registered") setNRError(true);
      else if (val === "Wrong Password") setWPError(true);
      else navigation("/dashboard/" + val);
    } catch (error) {
      console.error("error ->   ", error.message);
    }
  }

  return (
    <div className="login-screen">
      <div className="form-container">
        <h2>Login</h2>
        <form method="get" onSubmit={handleLogin}>
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
                setNRError(false);
                setWPError(false);
              }}
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
                setWPError(false);
              }}
            />
          </div>
          <div className="login-footer">
            <button type="submit" className="submit-btn">
              Login
            </button>
            <div>
              No Account?&nbsp;<Link to="/register">Create One</Link>
            </div>
          </div>
          {errorWP && <p style={{ color: "red" }}>* Wrong Password</p>}
          {errorNR && <p style={{ color: "red" }}>* user not registered</p>}
        </form>
      </div>
    </div>
  );
}

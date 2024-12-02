import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError(true);
    } else {
      const url = "http://localhost:8080/register";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        });
        const value = await response.text();
        if (value === "Success") navigation("/dashboard/" + name);
        else navigation("/404Error");
      } catch (error) {
        console.error(error.message);
      }
    }
  }
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
            />
            {error && (
              <p style={{ color: "red" }}>* The Passwords dont match.</p>
            )}
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

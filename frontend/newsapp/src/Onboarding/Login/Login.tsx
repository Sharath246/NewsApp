import { useNavigate, Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { getUser } from "../../api/getUser.ts";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorWP, setWPError] = useState(false);
  const [errorNR, setNRError] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigation = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    const val = await getUser(email, password);
    if (val === "No Result") navigation("/404Error");
    else if (val === "Not Registered") setNRError(true);
    else if (val === "Wrong Password") setWPError(true);
    else {
      if(remember)
      {
        localStorage.setItem("User", val);
        localStorage.setItem("Email",email);
      }
      else
      {
        sessionStorage.setItem("User",val);
        sessionStorage.setItem("Email", email);
      }
      navigation("/dashboard");
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user !== null) navigation("/dashboard/" + user);
  }, [navigation]);

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
                setWPError(false);
              }}
              placeholder="Enter your Password"
            />
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

import { Link } from "react-router";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import "./Landing.css";
import { getSessionName } from "../../api/getUserSession";
export default function Landing() {
  const [user,setUser] = useState<string|null>(null);
  useEffect(()=>{
        async function getUserSession() {
          const name = await getSessionName();
          setUser(name);
        }
    if (localStorage.getItem("User") === null) {
      if (Cookies.get("User") === undefined) {
        getUserSession();
      } 
      else setUser(Cookies.get("User") || null);
    } 
    else setUser(localStorage.getItem("User"));
  },[user]);
  return (
    <div className="landing-container">
      <header
        className="navbar"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="logo">NewsApp</div>
      </header>
      <main className="hero-section">
        <h1>Stay Updated Anytime, Anywhere</h1>
        <p>
          Get the latest news from around the world with just one click. Your
          trusted source for breaking news and insights.
        </p>
        <div className="cta-buttons">
          {user === null ? (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Register
              </Link>
              <Link to="/dashboard" className="btn-secondary">
                Guest
              </Link>
            </>
          ) : (
            <><p>Welcome Back {user}</p>
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link></>
          )}
        </div>
        <Link to="/about" style={{ marginTop: "3%" }}>
          Know more about us
        </Link>
      </main>

      <footer className="footer">
        <p>&copy; 2024 NewsApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

import { Link } from "react-router-dom";
import React from "react";
export default function About() {
  return (
    <div className="main">
      <header className="navbar">
        <div className="logo">NewsApp</div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="about-section">
        <div className="content-container">
          <h1>About Us</h1>
          <p>
            Welcome to **NewsApp**, your one-stop destination for staying
            updated with the latest news and insights from around the globe. We
            are committed to delivering accurate, unbiased, and timely news to
            our audience, empowering them to make informed decisions.
          </p>
          <h2>Our Mission</h2>
          <p>
            At NewsApp, our mission is to bridge the gap between people and
            information. We strive to provide comprehensive news coverage,
            engaging content, and an accessible platform for everyone.
          </p>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Breaking news updates from trusted sources.</li>
            <li>Personalized content tailored to your interests.</li>
            <li>Available anytime, anywhere, on any device.</li>
            <li>100% commitment to journalistic integrity.</li>
          </ul>
          <h2>Our Team</h2>
          <p>
            NewsApp is powered by a team of dedicated journalists, analysts, and
            tech experts. Together, we work around the clock to bring you the
            stories that matter most.
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 NewsApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

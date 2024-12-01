import { Link } from "react-router"
import './Landing.css';
export default function Landing(){
    return(
        <div className="landing-container">
            <header className="navbar">
                <div className="logo">NewsApp</div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="hero-section">
                <h1>Stay Updated Anytime, Anywhere</h1>
                <p>Get the latest news from around the world with just one click. Your trusted source for breaking news and insights.</p>
                <div className="cta-buttons">
                    <Link to="#subscribe" className="btn-primary">Subscribe Now</Link>
                    <Link to="/about" className="btn-secondary">Learn More</Link>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2024 NewsApp. All rights reserved.</p>
            </footer>
        </div>
    )
}
import { Link } from "react-router-dom"
import './Home.css'
import logo from '../assets/logo.png'


const Home = () => {
    const token = localStorage.getItem("token");
    return (
        <div className="home-container">
            <header>
                <img className="home-logo" src={logo} alt="logo" />
                <p>The simplest way to build and maintain daily habits for a better life.</p>
            </header>

            <section className="hero">
                <h2>Track your habits effortlessly</h2>
                <p>Stay motivated and improve your productivity by tracking your daily habits with ease.</p>
                <div className="cta-buttons">
                    <Link to={token ? '/dashboard' : '/login'} className="btn btn-primary">Login</Link>
                    <Link to='/register' className="btn btn-secondary">Create Account</Link>
                </div>
            </section>

            <section className="features">
                <h3>Features</h3>
                <div className="feature-list">
                    <div className="feature">
                        <h4>Simple & Intuitive</h4>
                        <p>Easily add, edit, and track your habits with a clean and user-friendly interface.</p>
                    </div>
                    <div className="feature">
                        <h4>Daily Reminders</h4>
                        <p>Get reminders to keep you on track and motivated every day.</p>
                    </div>
                    <div className="feature">
                        <h4>Progress Insights</h4>
                        <p>Visualize your progress and stay motivated with detailed habit statistics.</p>
                    </div>
                    <div className="feature">
                        <h4>Free & Secure</h4>
                        <p>Use the site for free with your data securely stored and private.</p>
                    </div>
                </div>
            </section>

            <footer>
                <p>Start building better habits today!</p>
            </footer>
        </div>
    )
}

export default Home

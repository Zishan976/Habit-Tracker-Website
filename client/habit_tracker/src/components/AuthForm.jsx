import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../pages/LogInRegister.css';
import { ArrowRight } from 'lucide-react';
import { api } from '../utils/api';

const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? "/auth/login" : "/auth/register";
            const data = isLogin
                ? { email, password }
                : { username, email, password };
            const res = await api.post(endpoint, data);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (_error) {
            localStorage.removeItem("token");
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-form">
            <h2 className="greating">{isLogin ? "Hi! Welcome Back" : "Hi there! Welcome"}</h2>
            <p>{isLogin ? "Log in to your account to continue using the app." : "We are excited to have you here, Setup your account in few minutes and get started."}</p>

            <form className="form" onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <label htmlFor="username">Username</label>
                        <input
                            className="input"
                            type="text"
                            id="username"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </>
                )}
                <label htmlFor="email">Email</label>
                <input
                    className="input"
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    className="input"
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="form-links">
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className="login-button">
                    {isLogin ? "Log In" : "Sign Up"} <ArrowRight />
                </button>
            </form>

            <p className="signup-link">
                {isLogin ? "Don't have an account?" : "Already have an account?"} <Link to={isLogin ? "/register" : "/login"}>{isLogin ? "Sign Up" : "Log In"}</Link>
            </p>
        </div>
    );
};

export default AuthForm;

import React, { useState } from "react";
import "../auth.form.scss";
import "../style.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/")
  };

  if (loading) {
    return <div className="loading-screen">
      <div className="loader"></div>
    </div>;
  }

  return (
    <div className="auth-main-page">
      <div className="form-container">
        <div className="logo-section">
          <img src="/logo.svg" alt="" />
          <span>HireSight</span>
        </div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

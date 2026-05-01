import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Shield } from "lucide-react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-page">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${15 + i * 15}%`,
              animationDuration: `${8 + i * 3}s`,
              animationDelay: `${i * 1.5}s`,
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ animation: 'none' }}
      >
        {/* Logo */}
        <motion.div
          className="auth-logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="auth-logo-icon">
            <Shield size={24} color="white" />
          </div>
        </motion.div>

        <motion.h1
          className="auth-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          SecureBank
        </motion.h1>

        <motion.p
          className="auth-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Secure Login Portal
        </motion.p>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              id="login-email"
            />
          </div>

          <div className="input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              id="login-password"
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '-4px' }}>
            <Link to="/forgot-password" className="auth-link" id="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            className="btn-primary"
            onClick={login}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            id="login-button"
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <LogIn size={18} />
              Sign In
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Don't have an account?{" "}
          <Link to="/register" className="auth-link" id="register-link">
            Create Account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
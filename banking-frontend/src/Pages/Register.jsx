import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, Shield } from "lucide-react";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {

    await api.post("/auth/register", {
      fullName,
      email,
      password
    });

    alert("Registered Successfully");

    navigate("/");
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
              left: `${10 + i * 14}%`,
              animationDuration: `${9 + i * 2.5}s`,
              animationDelay: `${i * 1.2}s`,
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
          Create Account
        </motion.h1>

        <motion.p
          className="auth-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Join SecureBank and manage your finances
        </motion.p>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="input-wrapper">
            <User size={18} className="input-icon" />
            <input
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              className="auth-input"
              id="register-fullname"
            />
          </div>

          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              id="register-email"
            />
          </div>

          <div className="input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              id="register-password"
            />
          </div>

          <motion.button
            className="btn-primary"
            onClick={register}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            id="register-button"
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <UserPlus size={18} />
              Create Account
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Already have an account?{" "}
          <Link to="/" className="auth-link" id="back-to-login-link">
            Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Register;
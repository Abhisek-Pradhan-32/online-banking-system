import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import { Mail, KeyRound, Lock, Send, RotateCcw, Shield, ArrowLeft } from "lucide-react";

function ForgotPassword() {

  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [newPassword,setNewPassword] = useState("");

  const sendOtp = async () => {
    await api.post("/auth/send-otp?email=" + email);
    alert("OTP Sent");
  };

  const resetPassword = async () => {
    const res = await api.post(
      "/auth/reset-password?email=" + email +
      "&otp=" + otp +
      "&newPassword=" + newPassword
    );

    alert(res.data);
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
              left: `${12 + i * 13}%`,
              animationDuration: `${7 + i * 3}s`,
              animationDelay: `${i * 1.3}s`,
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
          Reset Password
        </motion.h1>

        <motion.p
          className="auth-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Enter your email to receive a verification OTP
        </motion.p>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Step 1: Email + Send OTP */}
          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              id="forgot-email"
            />
          </div>

          <motion.button
            className="btn-secondary"
            onClick={sendOtp}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%' }}
            id="send-otp-button"
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Send size={16} />
              Send OTP
            </span>
          </motion.button>

          <div className="auth-divider">
            <span>verify & reset</span>
          </div>

          {/* Step 2: OTP + New Password */}
          <div className="input-wrapper">
            <KeyRound size={18} className="input-icon" />
            <input
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="auth-input"
              id="forgot-otp"
            />
          </div>

          <div className="input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              placeholder="New Password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="auth-input"
              id="forgot-new-password"
            />
          </div>

          <motion.button
            className="btn-primary"
            onClick={resetPassword}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            id="reset-password-button"
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <RotateCcw size={18} />
              Reset Password
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/" className="auth-link" id="back-login-link">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} />
              Back to Login
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
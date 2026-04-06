import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../utils/api";
import "./auth.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const requestToken = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMsg(data.message);
      if (data.resetToken) setToken(data.resetToken);
      setStep(2);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMsg(data.message);
      setStep(3);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-page-single">
      <div className="auth-card">
        <h1>Reset password</h1>
        {step === 1 && (
          <form onSubmit={requestToken} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {err && <div className="auth-banner auth-error">{err}</div>}
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "…" : "Send reset link"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={reset} className="auth-form">
            <p className="auth-lead">{msg}</p>
            <label>
              Reset token (paste from response in dev)
              <input value={token} onChange={(e) => setToken(e.target.value)} required />
            </label>
            <label>
              New password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </label>
            {err && <div className="auth-banner auth-error">{err}</div>}
            <button type="submit" className="auth-submit" disabled={loading}>
              Update password
            </button>
          </form>
        )}
        {step === 3 && <p className="auth-lead">{msg}</p>}
        <p className="auth-footer-links">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

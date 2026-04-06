import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const msg = location.state?.message;

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from;
      const path = from?.pathname || "/dashboard";
      navigate(path, { replace: true, state: from?.state });
    }
  }, [isAuthenticated, navigate, location.state?.from, location.state?.from?.pathname]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const u = await login(email, password);
      const from = location.state?.from;
      if (u.role === "admin" && location.state?.adminEntry) {
        navigate("/admin", { replace: true });
      } else if (u.role === "admin" && from?.pathname === "/admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(from?.pathname || "/dashboard", {
          replace: true,
          state: from?.state,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div
        className="auth-visual"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80)",
        }}
      />
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-lead">Sign in to submit rescues, adoptions, and give-a-pet requests.</p>
        {(msg || error) && (
          <div className="auth-banner">{error || msg}</div>
        )}
        <form onSubmit={submit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <div className="auth-pw-wrap">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowPw((s) => !s)}
                aria-label="Toggle password"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <label className="auth-check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
        <p className="auth-footer-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <span> · </span>
          <Link to="/signup" state={{ from: location.state?.from }}>
            Create account
          </Link>
          <span> · </span>
          <Link to="/admin">Staff / admin</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

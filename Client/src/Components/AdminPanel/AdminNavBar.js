import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminNavBar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Admin Panel</div>
      <div className="navbar-time">
        {user?.name ? `Signed in as ${user.name}` : "Administrator"}
      </div>
      <div className="navbar-time">{currentTime.toLocaleString()}</div>
      <button
        type="button"
        className="admin-nav-logout"
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavBar;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminPanel from "../AdminPanel/AdminPanel";

const AdminGate = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: { pathname: "/admin" },
          adminEntry: true,
          message: "Please login with an admin account.",
        }}
      />
    );
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <AdminPanel />;
};

export default AdminGate;

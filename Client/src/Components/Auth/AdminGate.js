import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminPanel from "../AdminPanel/AdminPanel";
import AdminLogin from "../AdminPanel/AdminLogin";

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
    return <AdminLogin />;
  }

  if (user.role !== "admin") {
    return <AdminLogin />;
  }

  return <AdminPanel />;
};

export default AdminGate;

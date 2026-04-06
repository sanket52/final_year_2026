import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE, authHeaders } from "../../utils/api";
import "./auth.css";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me/requests`, {
          headers: authHeaders(),
        });
        const json = await res.json();
        if (!cancelled && res.ok) setData(json);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <h1>My dashboard</h1>
          <p>
            {user?.name} · {user?.email}
            {user?.role === "admin" && (
              <>
                {" "}
                · <Link to="/admin">Admin panel</Link>
              </>
            )}
          </p>
        </div>
        <button type="button" className="dash-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading your activity…</p>
      ) : (
        <div className="dash-grid">
          <section className="dash-section">
            <h2>Adoption requests</h2>
            {(data?.adoptionRequests || []).length === 0 ? (
              <p className="dash-empty">None yet.</p>
            ) : (
              <ul>
                {data.adoptionRequests.map((r) => (
                  <li key={r._id}>
                    Pet ID: {r.petId} · {r.email} ·{" "}
                    {new Date(r.createdAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="dash-section">
            <h2>Give a pet submissions</h2>
            {(data?.givePetRequests || []).length === 0 ? (
              <p className="dash-empty">None yet.</p>
            ) : (
              <ul>
                {data.givePetRequests.map((r) => (
                  <li key={r._id}>
                    {r.petName} ({r.petType}) · {r.status} ·{" "}
                    {new Date(r.createdAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="dash-section">
            <h2>Emergency reports</h2>
            {(data?.emergencyReports || []).length === 0 ? (
              <p className="dash-empty">None yet.</p>
            ) : (
              <ul>
                {data.emergencyReports.map((r) => (
                  <li key={r._id}>
                    {r.status} · {r.emergencyType} ·{" "}
                    {new Date(r.createdAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

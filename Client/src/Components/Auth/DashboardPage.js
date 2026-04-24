import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE, authHeaders } from "../../utils/api";
import "./auth.css";

const messageForStatus = (type, status) => {
  const value = String(status || "").toLowerCase();

  if (type === "givePet") {
    if (value === "approved") return "Your give-a-pet request has been approved. Our team can now contact you for the next step.";
    if (value === "rejected") return "This give-a-pet request was rejected. You can submit a new request with updated details.";
    return "Your give-a-pet request is waiting for admin review.";
  }

  if (type === "adoption") {
    if (value === "approved") return "Your adoption request was approved. The team may contact you soon.";
    if (value === "rejected") return "This adoption request was not approved.";
    return "Your adoption request is still under review.";
  }

  if (type === "emergency") {
    if (value === "resolved") return "This emergency report has been marked resolved.";
    if (value === "in-progress") return "The rescue team is currently handling this report.";
    if (value === "rejected") return "This emergency report was closed without rescue action.";
    return "Your emergency report has been received and is being reviewed.";
  }

  if (type === "petPost") {
    if (value === "approved") return "Your pet post was approved and is now visible for adoption.";
    if (value === "adopted") return "Your posted pet has been marked as adopted.";
    if (value === "rejected") return "Your pet post request was rejected by admin.";
    return "Your pet post request is still waiting for admin review.";
  }

  return "";
};

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
        <p>Loading your activity...</p>
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
                    <span className={`dash-status-badge dash-status-${r.status || "pending"}`}>
                      {r.status || "pending"}
                    </span>
                    <div className="dash-subtext">{messageForStatus("adoption", r.status)}</div>
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
                    <strong>{r.petName}</strong> ({r.petType}) ·{" "}
                    <span className={`dash-status-badge dash-status-${r.status || "pending"}`}>
                      {r.status || "pending"}
                    </span>
                    <div className="dash-subtext">{messageForStatus("givePet", r.status)}</div>
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
                    {r.emergencyType} ·{" "}
                    <span className={`dash-status-badge dash-status-${r.status || "received"}`}>
                      {r.status || "received"}
                    </span>
                    <div className="dash-subtext">{messageForStatus("emergency", r.status)}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="dash-section">
            <h2>Pet posting requests</h2>
            {(data?.petRequests || []).length === 0 ? (
              <p className="dash-empty">None yet.</p>
            ) : (
              <ul>
                {data.petRequests.map((r) => (
                  <li key={r._id}>
                    <strong>{r.name}</strong> ({r.type}) ·{" "}
                    <span className={`dash-status-badge dash-status-${String(r.status || "pending").toLowerCase()}`}>
                      {r.status || "Pending"}
                    </span>
                    <div className="dash-subtext">{messageForStatus("petPost", r.status)}</div>
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

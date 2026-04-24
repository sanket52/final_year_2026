import React, { useCallback, useEffect, useMemo, useState } from "react";
import { API_BASE, authHeaders } from "../../utils/api";

const endpoints = {
  pendingPets: `${API_BASE}/requests`,
  approvedPets: `${API_BASE}/approvedPets`,
  adoptedPets: `${API_BASE}/adoptedPets`,
  adoptionRequests: `${API_BASE}/api/adopt/all`,
  users: `${API_BASE}/api/auth/users`,
  givePetRequests: `${API_BASE}/api/give-pet/all`,
  emergencyReports: `${API_BASE}/api/emergency/all`,
};

const adminFetchOptions = (url) =>
  url.includes("/api/") ? { headers: authHeaders() } : undefined;

const AdminOverview = ({ onOpenSection }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const results = await Promise.all(
        Object.entries(endpoints).map(async ([key, url]) => {
          const response = await fetch(url, adminFetchOptions(url));
          const body = await response.json().catch(() => []);
          if (!response.ok) {
            throw new Error(body.error || `Failed to load ${key}`);
          }
          return [key, Array.isArray(body) ? body : []];
        })
      );

      setData(Object.fromEntries(results));
    } catch (err) {
      setError(err.message || "Failed to load admin dashboard.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  const cards = useMemo(() => {
    if (!data) return [];
    return [
      { key: "pendingPets", label: "Pending pet posts", value: data.pendingPets.length, section: "postingPet" },
      { key: "approvedPets", label: "Approved pets", value: data.approvedPets.length, section: "approvedRequests" },
      { key: "adoptedPets", label: "Adopted pets", value: data.adoptedPets.length, section: "adoptedHistory" },
      { key: "adoptionRequests", label: "Adoption requests", value: data.adoptionRequests.length, section: "adoptingPet" },
      { key: "users", label: "Registered users", value: data.users.length, section: "users" },
      { key: "givePetRequests", label: "Give a pet requests", value: data.givePetRequests.length, section: "givePet" },
      { key: "emergencyReports", label: "Emergency reports", value: data.emergencyReports.length, section: "emergency" },
    ];
  }, [data]);

  if (loading) return <p>Loading admin overview...</p>;
  if (error) return <p style={{ color: "#a32020" }}>{error}</p>;
  if (!data) return null;

  return (
    <div className="admin-overview">
      <div className="admin-overview-head">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Review platform activity, user requests, and pet records from one place.</p>
        </div>
        <button type="button" className="admin-refresh-btn" onClick={loadOverview}>
          Refresh
        </button>
      </div>

      <div className="admin-stats-grid">
        {cards.map((card) => (
          <button
            key={card.key}
            type="button"
            className="admin-stat-card"
            onClick={() => onOpenSection(card.section)}
          >
            <span className="admin-stat-value">{card.value}</span>
            <span className="admin-stat-label">{card.label}</span>
          </button>
        ))}
      </div>

      <div className="admin-overview-panels">
        <section className="admin-overview-panel">
          <h3>Recent adoption requests</h3>
          {data.adoptionRequests.slice(0, 5).map((row) => (
            <article key={row._id} className="admin-overview-row">
              <div>
                <strong>{row.userName || row.email}</strong>
                <p>Pet ID: {row.petId}</p>
              </div>
              <span>{row.createdAt ? new Date(row.createdAt).toLocaleString() : "-"}</span>
            </article>
          ))}
          {!data.adoptionRequests.length && <p>No adoption requests yet.</p>}
        </section>

        <section className="admin-overview-panel">
          <h3>Recent give-pet requests</h3>
          {data.givePetRequests.slice(0, 5).map((row) => (
            <article key={row._id} className="admin-overview-row">
              <div>
                <strong>{row.petName}</strong>
                <p>{row.ownerName} · {row.phone}</p>
              </div>
              <span>{row.status || "pending"}</span>
            </article>
          ))}
          {!data.givePetRequests.length && <p>No give-pet requests yet.</p>}
        </section>

        <section className="admin-overview-panel">
          <h3>Recent emergency reports</h3>
          {data.emergencyReports.slice(0, 5).map((row) => (
            <article key={row._id} className="admin-overview-row">
              <div>
                <strong>{row.emergencyType || "Emergency"}</strong>
                <p>{row.location || row.phone}</p>
              </div>
              <span>{row.status || "received"}</span>
            </article>
          ))}
          {!data.emergencyReports.length && <p>No emergency reports yet.</p>}
        </section>
      </div>
    </div>
  );
};

export default AdminOverview;

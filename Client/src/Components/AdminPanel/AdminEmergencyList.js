import React, { useEffect, useState, useCallback } from "react";
import { API_BASE, authHeaders } from "../../utils/api";

const AdminEmergencyList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/api/emergency/all`, {
        headers: authHeaders(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "Error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p>Loading emergency reports…</p>;
  if (err) return <p style={{ color: "#a32020" }}>{err}</p>;
  if (!rows.length) return <p>No emergency reports yet.</p>;

  return (
    <div className="admin-api-list">
      {rows.map((r) => (
        <article key={r._id} className="admin-api-card">
          <div className="admin-api-card-img">
            <img
              src={`${API_BASE}/api-files/emergency/${r.image}`}
              alt=""
            />
          </div>
          <div>
            <h3>
              {r.emergencyType} · {r.status}
            </h3>
            <p>
              <b>Phone:</b> {r.phone}
            </p>
            <p>
              <b>Location:</b> {r.location || "—"}
            </p>
            <p>
              <b>Coords:</b> {r.coordinates?.lat}, {r.coordinates?.lng}
            </p>
            <p>
              <b>When:</b>{" "}
              {r.createdAt && new Date(r.createdAt).toLocaleString()}
            </p>
            <p>
              <b>Description:</b> {r.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AdminEmergencyList;

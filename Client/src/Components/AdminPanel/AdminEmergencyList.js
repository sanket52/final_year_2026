import React, { useEffect, useState, useCallback } from "react";
import { API_BASE, authHeaders } from "../../utils/api";

const AdminEmergencyList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [updatingId, setUpdatingId] = useState("");

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

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/api/emergency/${id}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to update status");
      await load();
    } catch (e) {
      setErr(e.message || "Failed to update status");
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) return <p>Loading emergency reports...</p>;
  if (err) return <p style={{ color: "#a32020" }}>{err}</p>;
  if (!rows.length) return <p>No emergency reports yet.</p>;

  return (
    <div className="admin-api-list">
      {rows.map((r) => (
        <article key={r._id} className="admin-api-card">
          <div className="admin-api-card-img">
            <img src={`${API_BASE}/api-files/emergency/${r.image}`} alt="" />
          </div>
          <div>
            <h3>
              {r.emergencyType} ·{" "}
              <span className={`admin-status-badge admin-status-${r.status || "received"}`}>
                {r.status || "received"}
              </span>
            </h3>
            <p>
              <b>Phone:</b> {r.phone}
            </p>
            <p>
              <b>Location:</b> {r.location || "-"}
            </p>
            <p>
              <b>Coords:</b> {r.coordinates?.lat}, {r.coordinates?.lng}
            </p>
            <p>
              <b>When:</b> {r.createdAt && new Date(r.createdAt).toLocaleString()}
            </p>
            <p>
              <b>Description:</b> {r.description}
            </p>
            <div className="admin-inline-actions">
              <button
                type="button"
                disabled={updatingId === r._id}
                onClick={() => handleStatusChange(r._id, "in-progress")}
              >
                In Progress
              </button>
              <button
                type="button"
                disabled={updatingId === r._id}
                onClick={() => handleStatusChange(r._id, "resolved")}
              >
                Resolved
              </button>
              <button
                type="button"
                disabled={updatingId === r._id}
                onClick={() => handleStatusChange(r._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AdminEmergencyList;

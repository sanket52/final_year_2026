import React, { useEffect, useState, useCallback } from "react";
import { API_BASE, authHeaders } from "../../utils/api";

const AdminGivePetList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/api/give-pet/all`, {
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
      const res = await fetch(`${API_BASE}/api/give-pet/${id}/status`, {
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

  if (loading) return <p>Loading give-a-pet submissions...</p>;
  if (err) return <p style={{ color: "#a32020" }}>{err}</p>;
  if (!rows.length) return <p>No give-a-pet submissions yet.</p>;

  return (
    <div className="admin-api-list">
      {rows.map((r) => (
        <article key={r._id} className="admin-api-card">
          <div className="admin-api-card-img">
            <img src={`${API_BASE}/api-files/give-pet/${r.image}`} alt="" />
          </div>
          <div>
            <h3>
              {r.petName} · {r.petType}
            </h3>
            <p>
              <b>Owner:</b> {r.ownerName} · {r.phone} · {r.city}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className={`admin-status-badge admin-status-${r.status || "pending"}`}>
                {r.status || "pending"}
              </span>{" "}
              · {r.createdAt && new Date(r.createdAt).toLocaleString()}
            </p>
            <p>
              <b>Reason:</b> {r.reason}
            </p>
            <div className="admin-inline-actions">
              <button
                type="button"
                disabled={updatingId === r._id || r.status === "approved"}
                onClick={() => handleStatusChange(r._id, "approved")}
              >
                {updatingId === r._id ? "Updating..." : "Approve"}
              </button>
              <button
                type="button"
                disabled={updatingId === r._id || r.status === "pending"}
                onClick={() => handleStatusChange(r._id, "pending")}
              >
                Pending
              </button>
              <button
                type="button"
                disabled={updatingId === r._id || r.status === "rejected"}
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

export default AdminGivePetList;

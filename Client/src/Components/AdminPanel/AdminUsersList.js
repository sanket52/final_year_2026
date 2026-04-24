import React, { useCallback, useEffect, useState } from "react";
import { API_BASE, authHeaders } from "../../utils/api";

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/users`, {
        headers: authHeaders(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to load registered users");
      }
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "Failed to load registered users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p>Loading registered users...</p>;
  if (err) return <p style={{ color: "#a32020" }}>{err}</p>;
  if (!users.length) return <p>No registered users found.</p>;

  return (
    <div className="admin-users-grid">
      {users.map((user) => (
        <article key={user._id} className="admin-user-card">
          <h3>{user.name || "Unnamed user"}</h3>
          <p>
            <b>Email:</b> {user.email || "-"}
          </p>
          <p>
            <b>Phone:</b> {user.phone || "-"}
          </p>
          <p>
            <b>City:</b> {user.city || "-"}
          </p>
          <p>
            <b>Role:</b> {user.role || "user"}
          </p>
          <p>
            <b>Joined:</b>{" "}
            {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
          </p>
        </article>
      ))}
    </div>
  );
};

export default AdminUsersList;

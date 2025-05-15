import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InviteUser.css";

function InviteUserPage() {
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const allPermissions = ["delete user", "invite user"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/admin/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, permissions }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Invitation sent successfully!");
        setEmail("");
        setPermissions([]);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.message || "Error sending invitation.");
      }
    } catch (error) {
      console.error("Invite error:", error);
      setMessage("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  return (
    <div className="invite-user-container">
      <h2>Invite a New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Permissions</label>
          <div className="permission-checkboxes">
            {allPermissions.map((perm) => (
              <label key={perm}>
                <input
                  type="checkbox"
                  value={perm}
                  checked={permissions.includes(perm)}
                  onChange={() => handlePermissionChange(perm)}
                />
                {" "}
                {perm}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Invitation"}
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default InviteUserPage;

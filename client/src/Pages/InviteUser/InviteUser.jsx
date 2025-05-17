import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InviteUser.css";

function InviteUserPage() {

  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const allPermissions = [
    "invite user",
    "delete user",
    "edit user",
    "view_email",
    "view_phone",
  ];  

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
        body: JSON.stringify({
          email,
          permissions,
          frontendUrl: import.meta.env.VITE_NGROK_URL,
        }),
      });      
      
      const data = await res.json();

      if (res.ok) {
        setMessage("Invitation sent successfully!");
        setEmail("");
        setPermissions([]);
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

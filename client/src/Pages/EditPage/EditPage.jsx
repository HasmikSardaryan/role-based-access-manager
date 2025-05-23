import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './EditPage.css'

export default function EditUser() {
  const { userId } = useParams();
  const [email, setEmail] = useState("");

  const handleEditMail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/edit/email/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update email");
      }

      alert("Email updated successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleEditMail}>
        <label>
          Email: 
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}


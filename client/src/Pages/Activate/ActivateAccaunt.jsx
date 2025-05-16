import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ActivateAccaunt.css'

export default function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleActivate = async () => {
    if (!password || !username || !phone) {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/activate/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, username, phone }),
      });

      const text = await res.text();

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        throw new Error("Invalid JSON response from server.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Activation failed.");
      }

      setMessage(data.message || "Account activated successfully.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(err.message || "Activation failed.");
    }
  };

  return (
    <div className="container">
      <h1>Activate Your Account</h1>
      <div className="inp-div">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={handleActivate}>Activate</button>
      {message && <p>{message}</p>}
    </div>
  );
}

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleActivate = async () => {
    try {
      const res = await fetch(`/activate/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Activation failed.");
      }

      setMessage(data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(err.message || "Activation failed.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Activate Your Account</h1>
      <input
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-3"
      />
      <button
        onClick={handleActivate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Activate
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}

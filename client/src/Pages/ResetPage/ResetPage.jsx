import React, { useState } from "react";
import './ResetPage.css'

export default function Reset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          frontendUrl: import.meta.env.VITE_NGROK_URL,}),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Reset email sent! Check your inbox.');
      } else {
        setMessage(data.error || 'Failed to send reset email');
      }
    } catch (err) {
      setMessage('Server error sending reset email');
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset your password</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={handleResetRequest}>Send reset email</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

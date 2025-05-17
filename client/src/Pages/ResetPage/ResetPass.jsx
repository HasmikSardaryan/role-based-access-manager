import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/new-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password1, password2 }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password updated successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="reset-container">
      <h2>Enter your new password</h2>
      <input
        type="password"
        value={password1}
        onChange={e => setPassword1(e.target.value)}
        placeholder="New Password"
      />
      <input
      type="password"
      value={password2}
      onChange={e => setPassword2(e.target.value)}
      placeholder="New Password"
    />
      <button onClick={handleSubmit}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

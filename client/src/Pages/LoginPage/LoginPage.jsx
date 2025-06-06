import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';

function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Logged in siccessfully');
        navigate('/');
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  return (
    <>
    <div className="login"> 
      <p>Login</p>
      <span className="log-span">
        Username:    
        <input type="text" onChange={e => setLoginUsername(e.target.value)}/>
      </span>
      <span className="log-span">
        Password:
        <input type="password" onChange={e => setLoginPassword(e.target.value)}/>
      </span>
      <button onClick={handleLogin}>Login</button>
      <span className="log-span">
      <Link to="/forgot" style={{ color: '#551AB8' }}>Forgot your password?</Link>
      </span>
    </div>
    </>
  );
}

export default Login;

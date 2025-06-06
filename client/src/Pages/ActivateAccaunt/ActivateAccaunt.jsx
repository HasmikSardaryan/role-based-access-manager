import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ActivateAccaunt.css';

export default function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null); 
  const [about, setAbout] = useState(""); 
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleActivate = async () => {
    if (!password || !username || !phone ) {
      setIsSuccess(false);
      setMessage("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("photo", photo); 

    try {
      const res = await fetch(`http://localhost:3000/activate/${token}`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        throw new Error("Invalid JSON response from server.");
      }

      if (!res.ok) {
        setIsSuccess(false);
        throw new Error(data.message || "Activation failed.");
      }

      setIsSuccess(true);
      setMessage(data.message || "Account activated successfully.");
      setTimeout(() => {
        window.location.href = "http://localhost:5173/login";
      }, 3000);
    } catch (err) {
      setIsSuccess(false);
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
        <input
          type="text"
          placeholder="About myself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>
      <button className="btn-act" onClick={handleActivate}>
        Activate
      </button>
      {message && (
        <p className={`msg ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
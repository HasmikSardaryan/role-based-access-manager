import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import './EditPage.css';

export default function EditUser() {

  const { userId } = useParams();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEdit = async () => {

    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch(`http://localhost:3000/edit/user/${userId}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error("Invalid JSON response from server.");
      }

      if (!res.ok) {
        setIsSuccess(false);
        throw new Error(data.error || "Failed to update user.");
      }

      setIsSuccess(true);
      setMessage(data.message || "User updated successfully!");
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setIsSuccess(false);
      setMessage(err.message || "Update failed.");
    }
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      <div className="inp-div">
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>
      <button className="btn-act" onClick={handleEdit}>
        Save Changes
      </button>
      {message && (
        <p className={`msg ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

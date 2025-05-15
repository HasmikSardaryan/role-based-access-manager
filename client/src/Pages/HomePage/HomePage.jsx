import React from "react";
import User from "../../Components/User/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./HomePage.css";

function HomePage() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken.role;
      if (role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/admin/invite-user')
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
  
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}/delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const data = await res.json();

      if (res.ok) {
        alert("User deleted successfully.");
      } else {
        alert(data.error || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error.");
    }
  };
  
  return (
    <>
  {isAdmin && (
  <button className="create-user-button" onClick={handleCreateUser}>
    Create User
  </button>
)}

<div className="container">
  <div className="user-list">
    <div className="user-card">
      <User
        img="https://i.pravatar.cc/48"
        username="Jane Doe"
        email="jane@example.com"
        phone="123-456-7890"
      />
      {isAdmin && (
        <div className="user-actions">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      )}
    </div>

    {users.map((user, index) => (
      <div className="user-card" key={`index-${index}`}>
        <User
          username={user.username}
          email={user.email}
          phone={user.phone}
          _id={user._id}
        />
        {isAdmin && (
          <div className="user-actions">
            <button className="edit-btn" onClick={() => handleEdit(user._id)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default HomePage;
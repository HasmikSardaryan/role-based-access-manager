import React from "react";
import User from "../../Components/User/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (token) {
      fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken.role;
      const data = decodedToken.permissions;

      setPermissions(data);
      if (role === 'admin') {
        setIsAdmin(true);
      }

    } else {
      navigate('/login');
    }
  }, [token]);

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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <>
      <div className="buttons">
        {permissions.includes('invite') && (
          <button className="invite-user-btn" onClick={handleCreateUser}>
          Invite User
          </button>
        )}
        {token ? (
          <button className="logout-btn" onClick={handleLogout}>
          Logout
          </button>
          ) : (
          <button className="login-btn" onClick={handleLogin}>
          Login
          </button>
        )}
      </div>

      <div className="container">
        <div className="user-list">
          <div className="user-card">
            <User
              username="Jane"
              email="jane@example.com"
              phone="123-456-7890"
            />
            <div className="user-actions">
              {permissions.includes('edit') && (
                <button className="edit-btn">Edit</button>
              )}
              {permissions.includes('delete') && (
                <button className="delete-btn">Delete</button>
              )}
            </div>
          </div>
          {users.map((user, index) => (
            <div className="user-card" key={`index-${index}`}>
              <User
                username={user.username}
                email={user.email}
                phone={user.phone}
                _id={user._id}
              />
              <div className="user-actions">
                {permissions.includes('edit') && (
                  <button className="edit-btn" onClick={() => handleEdit(user._id)}>Edit</button>
                )}
                {permissions.includes('delete') && (
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                )}
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
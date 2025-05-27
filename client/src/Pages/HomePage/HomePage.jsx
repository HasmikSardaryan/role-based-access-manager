import React, { useEffect, useState } from "react";
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

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken.role;
      const permissions = decodedToken.permissions;
  
      setPermissions(permissions);
      if (role === 'admin') {
        setIsAdmin(true);
      }
  
      fetch(`http://localhost:3000/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
  
    } else {
      navigate('/login');
    }
  }, [token, navigate]);
  

  const handleCreateUser = () => {
    navigate('/admin/invite-user');
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
        setUsers(prev => prev.filter(u => u._id !== userId));
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
  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`);
  };

  return (
    <>
    <div className="buttons">
      {permissions.includes('invite user') && (
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
      <div className="user-container">
        <div className="user-list">
          {users.map((user, index) => (
            <div className="user-card" key={`index-${index}`}>
              <div className="user-photo">
              {user.photo && (
              <img className="user-avatar"
              src={user.photo}
              alt={`${user.username}'s avatar`}
              />
              )}  
              </div>
              <div className="user-info">
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number : {user.phone}</p>
                <p>About user : {user.about}</p>
              </div>
              <div className="user-actions">
                {permissions.includes('edit user') && (
                  <button className="edit-btn" onClick={() => handleEdit(user._id)}>Edit</button>
                )}
                {permissions.includes('delete user') && (
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

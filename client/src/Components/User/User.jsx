import React from 'react';
import { Link } from "react-router-dom";
import useUser from '../../hooks/useUser';
import './User.css'

const User = ({ img, username, email, phone }) => {
  return (
    <div className="user-card">
      <img src={img} alt={username} className="user-avatar" />
      <div className="user-info">
        <span className="user-name">{username}</span>
        <span className="user-email">{email}</span>
        <span className="user-phone">{phone}</span>
      </div>
    </div>
  );
};

export default User;
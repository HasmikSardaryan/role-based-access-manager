import React from 'react';

const User = ({ user, created, karma, about}) => {
  return (
    <div className="post">
      <p><strong>user:</strong> {user}</p>
      <p><strong>created:</strong> <span>{created}</span></p>
      <p><strong>karma:</strong> {karma}</p>
      <p><strong>about:</strong>{about}</p>
    </div>
  );
};

export default User;
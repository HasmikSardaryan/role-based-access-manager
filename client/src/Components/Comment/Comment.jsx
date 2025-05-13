import React, { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import './Comment.css';

const Comment = ({ author, text, time, _id}) => {
  const handleClick = () => {
    useUser(author._id);
  };
    return (
    <div className="comment">
      <div className="meta">
        <span>▲</span>
        <Link to={`/user/${author._id}`} className='link' onClick={handleClick}>{author.username}</Link>
        <span>{formatDistanceToNow(new Date(time), { addSuffix: true })}</span>
        <span>| next [–]</span>
      </div>
      <div className="text">{text}</div>
      <div className="reply-button1">
        <Link to={`/reply/${_id}`}>Reply</Link>
      </div>
    </div>
  );
};

export default Comment;


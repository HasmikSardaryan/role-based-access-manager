import React from 'react';
import { Link } from "react-router-dom";
import useUser from '../../hooks/useUser';
import './Posts.css'

const Post = ({ rank, title, domain, points, author, time, comments, _id }) => {
  const handleClick = () => {
    useUser(author._id);
  };
  return (
    <div className="post">
        <span >▲</span>
      <div className="post-rank">{rank}.</div>
      <div className="post-content">
        <div className='title'>
          <a href={domain} className="post-link" target="_blank" rel="noopener noreferrer">
          <span className="post-title">{title}</span>
          <span className="post-domain">({domain})</span>
          </a>
        </div>
        <div className="post-meta">
        <p className="inline-text">{points.length} points from</p>
          <Link to={`/user/${author._id}`} className='link' onClick={handleClick}>{author.username}</Link>
            <Link className='link'> {time} </Link>|
            <Link className='link'> hide </Link>|
            <Link to={`/comments/${_id}`} className='link'>{comments.length} comments</Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
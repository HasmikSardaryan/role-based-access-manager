import React from 'react';
import { Link } from "react-router-dom";


const JobPost = ({ rank, title, domain, time}) => {
  const domainUrl = `https://${domain}`;
  return (
    <div className="post">
      <div className="post-rank">{rank}.</div>
      <div className="post-content">
        <div className='title'>
           <a
            href={domainUrl}
            className="post-title"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="post-title">{title}</span>
            <span className="post-domain">({domain})</span>
          </a>
        </div>
        <div className="post-meta">
            <a href={domainUrl} className="link" target="_blank" rel="noopener noreferrer">
            {time} ago
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
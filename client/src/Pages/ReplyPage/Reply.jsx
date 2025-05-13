import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../../Components/Comment/Comment';
import Header from '../Header/Header';
import { formatDistanceToNow } from 'date-fns';
import './Reply.css';

const ReplyPage = () => {

  const { id } = useParams();
  const [replyText, setReply] = useState('');
  const [comment, setComment] = useState(null);
  const [replies, setReplies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comment/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const data = await res.json();
        setComment(data);
      } catch (err) {
        console.error("Error loading comment", err);
      }
    };

    const fetchReplies = async () => {
      try {
        const res = await fetch(`http://localhost:3000/replies/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const data = await res.json();
        setReplies(data);
      } catch (err) {
        console.error("Error loading replies", err);
      }
    };

    fetchComment();
    fetchReplies();
  }, [id]);

  const handleReplySubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/reply/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: replyText })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Reply posted');
        setReply('');
        setReplies([...replies, data.reply]);
      } else {
        if (data.error === 'no token') {
          navigate('/login');
        } else {
          alert(data.error);
        }
      }
    } catch (err) {
      console.error('Error posting reply', err);
    }
  };

  return (
    <div className='homepage'>
      <Header />
      {comment ? (
        <>
          <Comment
            key={comment._id}
            author={comment.author}
            text={comment.text}
            time={comment.time}
            _id={comment._id}
          />
        <div className="reply-parge">
          <textarea
            rows={5}
            value={replyText}
            onChange={(e) => setReply(e.target.value)}
          />
          <br />
          <button className='reply-button' onClick={handleReplySubmit}>Reply</button>
        </div>
         <div className="reply-list">
            {replies.map(reply => (
              <div key={reply._id} className="reply-item">
                <p className="reply-time">{formatDistanceToNow(new Date(reply.time), { addSuffix: true })}</p>
                <p><strong>{reply.author}:</strong> {reply.text}</p>
              </div>
            ))}
          </div> 
        </>
      ) : (
        <div>Loading comment...</div>
      )}
      </div>
  );
};

export default ReplyPage;

import React, { useEffect, useState } from 'react';
import Comment from '/src/Components/Comment/Comment';
import Header from '/src/Pages/Header/Header';

const AllComments = () => {

  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);    
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  if (!comments.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="homepage">
      <Header/>
      {comments.length > 0 &&
    comments
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .map(comment => (
        <Comment
          key={comment._id}
          author={comment.author}
          text={comment.text}
          time={comment.time}
          _id={comment._id}
        />
      ))
}

    </div>
  );
};  

export default AllComments;


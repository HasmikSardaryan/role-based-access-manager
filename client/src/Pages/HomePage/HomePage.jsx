import React from "react";
import Header from "../Header/Header";
import Post from '/src/Components/Posts/Posts.jsx';
import { useEffect } from "react";
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import "./HomePage.css";

function HomePage() {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    // <div className="homepage">
    //   <Header />
    //   {posts
    //     .map((post, index) => {
    //       const timeAgo = formatDistanceToNow(new Date(post.time), { addSuffix: true });

    //       return (
    //         <Post
    //           key={`index-${index}`}
    //           rank={index + 1}
    //           title={post.title}
    //           domain={post.url}
    //           points={post.points}
    //           author={post.author}
    //           time={timeAgo}
    //           comments={post.comments}
    //           _id={post._id} 
    //         />
    //       );
    //     })}
    // </div> 
    <div className="container">

    </div>
  );
}

export default HomePage;

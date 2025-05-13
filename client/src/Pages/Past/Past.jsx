import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { formatDistanceToNow, subHours } from "date-fns";
import Post from "../../Components/Posts/Posts";

const Past = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const twentyFourHoursAgo = subHours(new Date(), 24);

  const oldPosts = posts
    .filter((post) => new Date(post.time) < twentyFourHoursAgo)

  return (
    <div className="homepage">
      <Header />
      {oldPosts.map((post, index) => {
        const timeAgo = formatDistanceToNow(new Date(post.time), {
          addSuffix: true,
        });

        return (
          <Post
            key={`index-${index}`}
            rank={index + 1}
            title={post.title}
            domain={post.url}
            points={post.points}
            author={post.author}
            time={timeAgo}
            comments={post.comments}
            _id={post._id}
          />
        );
      })}
    </div>
  );
};

export default Past;

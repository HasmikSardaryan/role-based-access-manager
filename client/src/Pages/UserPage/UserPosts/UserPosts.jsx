import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../../Components/Posts/Posts";
import Header from "../../Header/Header";
import { formatDistanceToNow } from "date-fns";

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/${id}/posts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load user posts", err);
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <div className="homepage">
      <Header />
      <h2>User Submissions</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            rank={null}
            title={post.title}
            domain={post.url}
            points={post.points}
            author={post.author.username}
            time={formatDistanceToNow(new Date(post.time), { addSuffix: true })}
            comments={post.comments.length}
          />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default UserPosts;

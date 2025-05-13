import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Header from "../Header/Header";
import "./UserPage.css"

const UserPage = () => {
  const { id } = useParams();
  const { user, loading } = useUser(id);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${id}/submissions`);
  };

  if (loading) return <div>Loading user...</div>;
  if (!user) return <div>User not found</div>;

  const createdAt = new Date(user.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = createdAt.toLocaleDateString("en-US", options);

  return (
    <div className="homepage">
      <Header />
      <p>User: {user.username}</p>
      <p>Created: {formattedDate}</p>
      <p>Karma: {user.karma}</p>
      <p className="about-user">
        About:{" "}
        <span
          onClick={handleClick}
         className="submissions-link"
        >
          Submissions
        </span>
      </p>
    </div>
  );
};

export default UserPage;

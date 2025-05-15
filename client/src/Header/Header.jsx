import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import "./header.css";

const Header = () => {
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="logoimg"
          src="https://news.ycombinator.com/y18.svg"
          alt=""
        />
      </Link>
      <Link to="/" className="router">
        <b>Hacker News </b>
      </Link>
      {user && (
        <Link to="/welcome" className="router">
          welcome |
        </Link>
      )}
      <Link to="/newest" className="router">
      new
      </Link>
      |
      {user && (
        <Link to="/thread" className="router">
          thread |
        </Link>
      )}

      <Link to="/past" className="router">
        past
      </Link>
      |
      <Link to="/comments" className="router">
        comments
      </Link>
      |
      <Link to="/jobs" className="router">
        jobs
      </Link>
      |
      <Link to="/submit" className="router">
        submit
      </Link>
      <span className="login">
        {user ? (
          <Link to="/logout" className="router">
            logout
          </Link>
        ) : (
          <Link to="/login" className="router">
            login
          </Link>
        )}
      </span>
    </div>
  );
};

export default Header;

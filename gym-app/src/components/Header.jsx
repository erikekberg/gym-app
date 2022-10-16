import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="header">
      <Link to="">
        <h1>Logo</h1>
      </Link>
      <ul>
        <Link to="">Home</Link>
        {props.signedIn ? (
          <Link to={`profile/${props.currentUser}`}>My Profile</Link>
        ) : (
          <Link to="sign-in">Sign In</Link>
        )}
      </ul>
    </div>
  );
}

export default Header;

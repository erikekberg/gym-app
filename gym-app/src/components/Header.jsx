import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="header">
      <h1>Logo</h1>
      <input type="text" placeholder="Search" />
      <ul>
        <Link to="">Home</Link>
        {props.signedIn ? (
          <Link to="profile">My Profile</Link>
        ) : (
          <Link to="sign-in">Sign In</Link>
        )}
      </ul>
    </div>
  );
}

export default Header;

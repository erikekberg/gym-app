import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../firebaseManager";

function Post(props) {
  const [userdata, setUserdata] = useState("");
  useEffect(() => {
    fetchDisplayName(props.user);
  }, []);

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  const fetchDisplayName = async (user) => {
    setUserdata(await getUserData(user));
  };

  if (userdata) {
    return (
      <div className="post">
        <Link to={`/profile/${props.user}`}>
          <div>
            <img src={userdata.avatar.stringValue} alt="" />
            <h1>{userdata.displayName.stringValue}</h1>
          </div>
          <h2>@{props.user}</h2>
        </Link>
        <p>{props.textcontent}</p>
      </div>
    );
  } else {
    <div></div>;
  }
}

export default Post;

import React from "react";

function Post(props) {
  return (
    <div className="post">
      <h2>{props.user}</h2>
      <p>{props.textcontent}</p>
    </div>
  );
}

export default Post;

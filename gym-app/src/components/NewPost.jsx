import React, { useEffect, useRef, useState } from "react";
import { addPost } from "../firebaseManager";

function NewPost(props) {
  const [textcontent, setTextcontent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    console.log(props.currentUser);
  });

  return (
    <div className="make-post">
      <button
        onClick={(e) => {
          if (props.currentUser) {
            addPost(props.currentUser, `@${props.currentUser}`, textcontent);
            props.newPostHandler();
          }
        }}
      >
        +
      </button>
      <textarea
        onChange={() => setTextcontent(textareaRef.current.value)}
        ref={textareaRef}
        placeholder="make a post"
        name="post"
        id="new-post"
        cols="30"
        rows="10"
        maxLength={708}
      ></textarea>
    </div>
  );
}

export default NewPost;

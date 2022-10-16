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
      {props.currentUser ? (
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
      ) : (
        <textarea
          onChange={() => setTextcontent(textareaRef.current.value)}
          ref={textareaRef}
          placeholder="you have to be signed in to make posts"
          className="not-signed-in"
          readOnly
          name="post"
          id="new-post"
          cols="30"
          rows="10"
          maxLength={708}
        ></textarea>
      )}
      <button
        onClick={(e) => {
          if (props.currentUser && textcontent) {
            addPost(props.currentUser, `@${props.currentUser}`, textcontent);
            props.newPostHandler();
          }
        }}
      >
        +
      </button>
    </div>
  );
}

export default NewPost;

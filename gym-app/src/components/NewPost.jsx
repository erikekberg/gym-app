import React, { useEffect, useRef } from "react";
import { addPost } from "../firebaseManager";

function NewPost() {
  let textcontent = "";
  const textareaRef = useRef(null);

  useEffect(() => {
    console.log(textareaRef.current.value);
  });

  return (
    <div className="make-post">
      <button onClick={(e) => addPost("erik", "@erkan", textcontent)}>+</button>
      <textarea
        onChange={() => (textcontent = textareaRef.current.value)}
        ref={textareaRef}
        placeholder="make a post"
        name="post"
        id="new-post"
        cols="30"
        rows="10"
      ></textarea>
    </div>
  );
}

export default NewPost;

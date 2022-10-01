import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts, addPost } from "../firebaseManager";
import NewPost from "./NewPost";

function Main() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    updatePosts();
  }, []);

  const updatePosts = async () => {
    setPosts(await getPosts());
  };

  return (
    <div className="main">
      <div className="hashtags">
        <ul>
          <li>#gym</li>
          <li>#Powerlifting</li>
          <li>#lightweight</li>
        </ul>
      </div>
      <NewPost />
      <div className="content-feed">
        {posts.map((post) => (
          <Post
            user={post.user}
            usertag={post.usertag}
            textcontent={post.textcontent}
          />
        ))}
      </div>
      <div className="trending">
        <h2 onClick={() => console.log(posts)}>Trending Profiles:</h2>
        <ul>
          <li>@Cbum</li>
          <li>@ErikEkberg</li>
          <li>@Arnold</li>
        </ul>
      </div>
    </div>
  );
}

export default Main;

import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts, addPost, getUserData } from "../firebaseManager";
import NewPost from "./NewPost";
import { Link } from "react-router-dom";

function Main(props) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    updatePosts();
  }, []);

  const updatePosts = async () => {
    setPosts(await getPosts());
  };

  return (
    <div className="main">
      <div className="hashtags">
        <h2>Tredning hashtags:</h2>
        <ul>
          <li
            onClick={async () => {
              if (filter === "#meme") {
                setFilter("");
              } else {
                setFilter("#meme");
              }
            }}
          >
            #meme
          </li>
          <li
            onClick={async () => {
              if (filter === "#news") {
                setFilter("");
              } else {
                setFilter("#news");
              }
            }}
          >
            #news
          </li>
          <li
            onClick={async () => {
              if (filter === "#flitter") {
                setFilter("");
              } else {
                setFilter("#flitter");
              }
            }}
          >
            #flitter
          </li>
        </ul>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <NewPost
        newPostHandler={() => updatePosts()}
        currentUser={props.currentUser}
      />
      <div className="content-feed">
        {posts
          .filter(
            (post) =>
              post.textcontent.toLowerCase().includes(filter.toLowerCase()) ||
              post.user.toLowerCase().includes(filter.toLowerCase())
          )
          .map((post) => (
            <Post
              displayName={getUserData(post.user)}
              user={post.user}
              key={posts.indexOf(post)}
              textcontent={post.textcontent}
            />
          ))}
      </div>
      <div className="trending">
        <h2>Trending Profiles:</h2>
        <ul>
          <li>
            <Link to="/profile/erkanperkan">@erkanperkan</Link>
          </li>
          <li>
            <Link to="/profile/erikekberg">@erikekberg</Link>
          </li>
          <li>
            <Link to="/profile/newaccountlol">@newaccountlol</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Main;

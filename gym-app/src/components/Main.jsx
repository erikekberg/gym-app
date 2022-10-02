import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts, addPost } from "../firebaseManager";
import NewPost from "./NewPost";

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
        <ul>
          <li
            onClick={async () => {
              setFilter("#gym");
            }}
          >
            #gym
          </li>
          <li
            onClick={async () => {
              setFilter("#powerlifting");
            }}
          >
            #Powerlifting
          </li>
          <li
            onClick={async () => {
              setFilter("#lightweight");
            }}
          >
            #lightweight
          </li>
        </ul>
      </div>
      <NewPost
        newPostHandler={() => updatePosts()}
        currentUser={props.currentUser}
      />
      <div className="content-feed">
        {posts
          .filter((post) =>
            post.textcontent.toLowerCase().includes(filter.toLowerCase())
          )
          .map((post) => (
            <Post
              user={post.user}
              key={posts.indexOf(post)}
              textcontent={post.textcontent}
            />
          ))}
      </div>
      <div className="trending">
        <h2
          onClick={() => {
            setPosts(
              posts.filter((post) => {
                return post.textcontent.includes("#gym");
              })
            );
          }}
        >
          Trending Profiles:
        </h2>
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

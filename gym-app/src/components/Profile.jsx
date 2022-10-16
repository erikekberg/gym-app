import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPosts,
  getUserData,
  updateUserDescription,
  updateUserAvatar,
  updateUserDisplayName,
} from "../firebaseManager";
import Post from "./Post";

function Profile(props) {
  const [userdata, setUserdata] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const params = useParams();

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, []);

  useEffect(() => {
    console.log(userdata);
    if (userdata) {
      setAvatarUrl(userdata.avatar.stringValue);
    }
  }, [userdata]);

  const fetchUserData = async () => {
    try {
      setUserdata(await getUserData(params.id));
    } catch {
      console.log("error");
    }
  };

  const fetchUserPosts = async () => {
    try {
      setUserPosts(
        await (await getPosts()).filter((post) => post.user === params.id)
      );
    } catch {
      console.log("error");
    }
  };

  const setUserAvatar = (input) => {
    const imgFile = input.files[0];
    var reader = new FileReader();
    reader.onloadend = async function () {
      await updateUserAvatar(params.id, reader.result);
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(imgFile);
  };

  if (userdata) {
    return (
      <div className="profile">
        {props.currentUser === params.id ? (
          <div className="setAvatarFile">
            <img src={avatarUrl} alt="profile pic" />
            <label htmlFor="avatarPicker">Choose Avatar</label>
            <input
              style={{ display: "none" }}
              type="file"
              id="avatarPicker"
              onChange={async (e) => {
                console.log(setUserAvatar(e.target));
              }}
            />
          </div>
        ) : (
          <img src={avatarUrl} alt="profile pic" />
        )}
        <h3>@{params.id}</h3>
        {props.currentUser === params.id ? (
          <div>
            <label style={{ display: "block" }} htmlFor="displayName">
              Set displayName:
            </label>
            <input
              placeholder={userdata.displayName.stringValue}
              id="displayName"
              onChange={(e) => updateUserDisplayName(params.id, e.target.value)}
            ></input>
          </div>
        ) : (
          <h1>{userdata.displayName.stringValue}</h1>
        )}
        {props.currentUser === params.id ? (
          <textarea
            placeholder={userdata.description.stringValue}
            onChange={async (e) =>
              await updateUserDescription(params.id, e.target.value)
            }
            rows="3"
            cols="35"
          ></textarea>
        ) : (
          <p>{userdata.description.stringValue}</p>
        )}

        <ul>
          {userPosts.map((post) => {
            return (
              <Post
                user={post.user}
                key={userPosts.indexOf(post)}
                textcontent={post.textcontent}
              />
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Profile;

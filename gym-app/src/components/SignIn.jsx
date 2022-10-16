import React, { useRef, useState } from "react";
import { validateSignIn, createUser } from "../firebaseManager";
import { useNavigate } from "react-router-dom";

function SignIn(props) {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [creatingProfile, setCreatingProfile] = useState(false);

  if (!creatingProfile) {
    return (
      <div className="sign-in">
        <h1>Sign in:</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input ref={usernameRef} type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input ref={passwordRef} type="password" id="password" />
        </div>
        <button
          onClick={async () => {
            if (
              await validateSignIn(
                usernameRef.current.value,
                passwordRef.current.value
              )
            ) {
              props.signInHandler(usernameRef.current.value);
              navigate("/");
            }
          }}
        >
          Sign In
        </button>
        <button onClick={() => setCreatingProfile(true)}>
          Don't have an account?
        </button>
      </div>
    );
  }
  return (
    <div className="create-profile">
      <h1>Create profile:</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input ref={usernameRef} type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" id="password" />
      </div>
      <button
        onClick={async () => {
          if (
            await createUser(
              usernameRef.current.value,
              passwordRef.current.value
            )
          ) {
            props.signInHandler(usernameRef.current.value);
            navigate("/");
          }
        }}
      >
        Create Profile
      </button>
      <button onClick={() => setCreatingProfile(false)}>
        Alredy have an account?
      </button>
    </div>
  );
}

export default SignIn;

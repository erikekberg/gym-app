import React, { useRef, useState } from "react";
import { validateSignIn, createUser } from "../firebaseManager";

function SignIn(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [creatingProfile, setCreatingProfile] = useState(false);

  if (!creatingProfile) {
    return (
      <div className="sign-in">
        <h1>Sign in:</h1>
        <label htmlFor="username">username:</label>
        <input ref={usernameRef} type="text" id="username" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" id="password" />
        <button
          onClick={async () => {
            if (
              await validateSignIn(
                usernameRef.current.value,
                passwordRef.current.value
              )
            ) {
              props.signInHandler(usernameRef.current.value);
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
      <label htmlFor="username">username:</label>
      <input ref={usernameRef} type="text" id="username" />
      <label htmlFor="password">Password:</label>
      <input ref={passwordRef} type="password" id="password" />
      <button
        onClick={async () => {
          if (
            await createUser(
              usernameRef.current.value,
              passwordRef.current.value
            )
          ) {
            props.signInHandler(usernameRef.current.value);
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

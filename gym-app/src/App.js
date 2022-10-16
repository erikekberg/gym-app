import React, { useState } from "react";
import Header from "./components/Header";
import "./style.css";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const signInHandler = (username) => {
    setSignedIn(true);
    setCurrentUser(username);
  };

  return (
    <div>
      <BrowserRouter>
        <Header signedIn={signedIn} currentUser={currentUser} />
        <Routes>
          <Route
            path=""
            element={<Main currentUser={currentUser ? currentUser : false} />}
          />
          <Route
            path="sign-in"
            element={<SignIn signInHandler={signInHandler} />}
          />
          <Route
            path="/profile/:id"
            element={<Profile currentUser={currentUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

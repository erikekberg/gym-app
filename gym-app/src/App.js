import React, { useState } from "react";
import Header from "./components/Header";
import "./style.css";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Header signedIn={signedIn} />
        <Routes>
          <Route
            path=""
            element={<Main currentUser={currentUser ? currentUser : false} />}
          />
          <Route
            path="sign-in"
            element={<SignIn signInHandler={signInHandler} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

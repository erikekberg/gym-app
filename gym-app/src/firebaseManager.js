// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDoc,
  getFirestore,
  doc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMWeusUoKi9pAB0zou6B9JCBbIaW-6dHI",
  authDomain: "gym-app-a9069.firebaseapp.com",
  projectId: "gym-app-a9069",
  storageBucket: "gym-app-a9069.appspot.com",
  messagingSenderId: "423225967883",
  appId: "1:423225967883:web:67d4b9c5a197c3de6f4e0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getPosts() {
  const docSnap = await getDocs(collection(db, "posts"));
  const postArr = [];
  docSnap.forEach((doc) => {
    postArr.unshift(doc.data());
  });
  return postArr;
}

async function getUserData(username) {
  const data = await getDoc(doc(db, "users", username));
  return data._document.data.value.mapValue.fields;
}

async function addPost(user, usertag, textcontent) {
  await setDoc(doc(db, "posts", Date.now().toString()), {
    user: user,
    textcontent: textcontent,
  });
}

async function validateSignIn(username, enteredPassword) {
  try {
    const data = await getDoc(doc(db, "users", username));
    const actualPassword =
      data._document.data.value.mapValue.fields.password.stringValue;
    if (actualPassword === enteredPassword) {
      return true;
    } else {
      console.log("wrong username or password");
      return false;
    }
  } catch {
    console.log("error");
  }
}

async function updateUserDescription(user, newDescription) {
  await updateDoc(doc(db, "users", user), {
    description: newDescription,
  });
}

async function updateUserAvatar(user, newAvatar) {
  console.log(newAvatar);
  await updateDoc(doc(db, "users", user), {
    avatar: newAvatar,
  });
}

async function updateUserDisplayName(user, newDisplayName) {
  await updateDoc(doc(db, "users", user), {
    displayName: newDisplayName,
  });
}

async function createUser(username, password) {
  if ((await (await getDoc(doc(db, "users", username))).data()) !== undefined) {
    console.log("username already taken");
  } else {
    try {
      await setDoc(doc(db, "users", username), {
        displayName: username,
        password: password,
        description: "no description yet",
        avatar:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      });
      return true;
    } catch {
      console.log("error with profile creation");
    }
  }
}

export {
  getPosts,
  addPost,
  validateSignIn,
  createUser,
  getUserData,
  updateUserDescription,
  updateUserAvatar,
  updateUserDisplayName,
};

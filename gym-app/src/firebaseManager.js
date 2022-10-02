// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDoc,
  getFirestore,
  doc,
  getDocs,
  collection,
  setDoc,
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

async function addPost(user, usertag, textcontent) {
  console.log("hello");
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
  } catch (error) {
    console.log(error);
  }
}

async function createUser(username, password) {
  if ((await (await getDoc(doc(db, "users", username))).data()) !== undefined) {
    console.log("username already taken");
  } else {
    try {
      await setDoc(doc(db, "users", username), {
        password: password,
      });
      return true;
    } catch {
      console.log("error with profile creation");
    }
  }
}

export { getPosts, addPost, validateSignIn, createUser };

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
    postArr.push(doc.data());
  });
  return postArr;
}

async function addPost(user, usertag, textcontent) {
  console.log(user, usertag, textcontent);
  await setDoc(doc(db, "posts", Date.now().toString()), {
    user: "erik",
    usertag: "@erkan",
    textcontent: textcontent,
  });
}

export { getPosts, addPost };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc , collection, addDoc, updateDoc, serverTimestamp , getDocs,
  onSnapshot,
  orderBy,
  query,  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCItWazvDsZxL3sPOgoZ0oRAhA8A9I3Ef4",
  authDomain: "todo-app-fa588.firebaseapp.com",
  databaseURL: "https://todo-app-fa588-default-rtdb.firebaseio.com",
  projectId: "todo-app-fa588",
  storageBucket: "todo-app-fa588.appspot.com",
  messagingSenderId: "612794350500",
  appId: "1:612794350500:web:429a75eee28132d8801f31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db, doc, collection , addDoc ,updateDoc, serverTimestamp  , getDocs,
  onSnapshot,
  orderBy,
  query,};

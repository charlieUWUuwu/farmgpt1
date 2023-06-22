import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Zqxunau93rcfZhARCD_FQgjlkSzHy-c",
  authDomain: "farmgpt-2d78f.firebaseapp.com",
  projectId: "farmgpt-2d78f",
  storageBucket: "farmgpt-2d78f.appspot.com",
  messagingSenderId: "622725277782",
  appId: "1:622725277782:web:168444d3b2118875f833f7",
  measurementId: "G-33RSE9TT8Q",
};

// Initialize Firebase
//singleton pattern encoding(only want a single instance)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

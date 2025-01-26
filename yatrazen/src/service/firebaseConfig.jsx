// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwE9LoB83vlq61yzfD_F9mRaZpMWoWDB8",
  authDomain: "yatrazen-f1c6b.firebaseapp.com",
  projectId: "yatrazen-f1c6b",
  storageBucket: "yatrazen-f1c6b.firebasestorage.app",
  messagingSenderId: "783368020271",
  appId: "1:783368020271:web:4ca5d197db15f52ffc41da",
  measurementId: "G-NN1YMDEG45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

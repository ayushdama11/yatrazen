import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwE9LoB83vlq61yzfD_F9mRaZpMWoWDB8",
  authDomain: "yatrazen-f1c6b.firebaseapp.com",
  projectId: "yatrazen-f1c6b",
  storageBucket: "yatrazen-f1c6b.appspot.com",
  messagingSenderId: "783368020271",
  appId: "1:783368020271:web:4ca5d197db15f52ffc41da",
  measurementId: "G-NN1YMDEG45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

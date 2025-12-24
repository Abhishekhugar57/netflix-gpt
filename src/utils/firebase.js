// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZdqKBZlMFI83r6OIW77WhHtHLpwKLw2Y",
  authDomain: "netflixgpt-56e10.firebaseapp.com",
  projectId: "netflixgpt-56e10",
  storageBucket: "netflixgpt-56e10.firebasestorage.app",
  messagingSenderId: "371128694308",
  appId: "1:371128694308:web:eb16e47ada025ed6fb4ab1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const auth = getAuth();

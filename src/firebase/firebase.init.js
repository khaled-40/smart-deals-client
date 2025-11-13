// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYn3A-4kZZJYmySAN3FO1lIwCUa1IP_R8",
  authDomain: "smart-deals-86bb6.firebaseapp.com",
  projectId: "smart-deals-86bb6",
  storageBucket: "smart-deals-86bb6.firebasestorage.app",
  messagingSenderId: "846995540829",
  appId: "1:846995540829:web:04b2d15b4b6fffd22af6b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
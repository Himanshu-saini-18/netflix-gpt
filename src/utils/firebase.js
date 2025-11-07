// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1EiRcSH4wzSSvGMGpEOAgMrJhxy3SDDs",
  authDomain: "netfixgpt-18d8c.firebaseapp.com",
  projectId: "netfixgpt-18d8c",
  storageBucket: "netfixgpt-18d8c.firebasestorage.app",
  messagingSenderId: "584385508263",
  appId: "1:584385508263:web:7799cd10f20f6359cbbc82",
  measurementId: "G-VJPHFEMDY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
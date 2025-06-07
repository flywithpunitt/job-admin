

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZoDNwtSiwxHT4u-dJKLQxs7LY_-JwBRo",
  authDomain: "job-portal-sbs.firebaseapp.com",
  projectId: "job-portal-sbs",
  storageBucket: "job-portal-sbs.appspot.com",
  messagingSenderId: "509130691031",
  appId: "1:509130691031:web:5bc6b35c63fd805e3fbb92",
  measurementId: "G-R031NHNFH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


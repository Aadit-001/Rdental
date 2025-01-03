// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCexG0wJUZPLhTCpas7ZaO4B5Vs2TKQDfY",
  authDomain: "rdental-01.firebaseapp.com",
  projectId: "rdental-01",
  storageBucket: "rdental-01.firebasestorage.app",
  messagingSenderId: "508634359501",
  appId: "1:508634359501:web:257d216bb2eaecc411eb84",
  measurementId: "G-1LQ1B3VG5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
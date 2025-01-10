import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
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
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;

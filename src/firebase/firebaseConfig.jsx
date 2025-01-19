import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration


//paid
// const firebaseConfig = {
//   apiKey: "AIzaSyBwUq_yTl_2HrSXAaJd5oiJw86fL41o5NI",
//   authDomain: "r-dental-bcb55.firebaseapp.com",
//   projectId: "r-dental-bcb55",
//   storageBucket: "r-dental-bcb55.firebasestorage.app",
//   messagingSenderId: "849765306990",
//   appId: "1:849765306990:web:92cd905e962f2fe3178c7f",
//   measurementId: "G-72RTH1GBPE"
// };


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
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export {fireDB,auth,provider,storage } ;



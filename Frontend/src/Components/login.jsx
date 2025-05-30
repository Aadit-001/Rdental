import  { useState } from 'react';
import Logoo from '../assets/logoo.png';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import myContext from '../context/data/myContext';
import Loader from './Loader';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebaseConfig';
import { Timestamp } from 'firebase/firestore';
import {  doc, getDoc, setDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/firebaseConfig';


const Login = () => {
  const { setShowSignIn, setShowSignUp,setIsUserLoggedIn,isLoading, setIsLoading, setCurrentUserId, setUser } = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleGoogleSignIn = async () => {
    try {

      // Configure provider to allow popups
      provider.setCustomParameters({
        'prompt': 'select_account',
        'display': 'popup'
      });

      const result = await signInWithPopup(auth, provider);
      
      // Create user object
      const user = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        wishlist: [],
        orders: [],
        carts: [],
        time : Timestamp.now()
      }

      // Check if user exists in Firestore
      const userDoc = doc(fireDB, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      // If user doesn't exist, create new document
      if (!docSnap.exists()) {
        await setDoc(userDoc, user);
      }

      // First update local storage
      localStorage.setItem('user', JSON.stringify(docSnap.exists() ? docSnap.data() : user));
      
      // Then update app state
      setIsUserLoggedIn(true);
      setShowSignIn(false);
      setCurrentUserId(result.user.uid);
      setUser(docSnap.exists() ? docSnap.data() : user);
      window.location.reload();

      toast.success('User Logged in successfully', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Finally navigate
      // if(location.pathname === '/') {
      //   // If we're already on home page, no need to navigate
      // localStorage.setItem('user', JSON.stringify(docSnap.exists() ? docSnap.data() : user));
      //   navigate('/');
      //   // return;
      // }
      navigate(location.pathname);

    } catch (error) {
      // console.error(error);
      // toast.error(error.message);
      console.error('Google Sign-In Error:', error);
      
      // Specific error handling
      if (error.code === 'auth/popup-closed-by-user') {
        // toast.info('Sign-in popup was closed. Please try again.', {
        //   position: "bottom-right",
        //   autoClose: 2000,
        // });
        window.alert('Please unblock the popup in your browser, or try manual login.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        window.alert('Sign-in request was cancelled. Please try again.');
      } else {
        window.alert('Authentication failed. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // First update local storage

      const userDoc = doc(fireDB, "users", user.user.uid);
      const docSnap = await getDoc(userDoc);
      localStorage.setItem('user', JSON.stringify(docSnap.data()));

      // Then update app state
      setIsUserLoggedIn(true);
      setShowSignIn(false);
      setCurrentUserId(user.user.uid);
      setUser(docSnap.data());
      window.location.reload();

      toast.success('User Logged in successfully', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      // Finally navigate
      if(location.pathname === '/') {
        // If we're already on home page, no need to navigate
        return;
      }
      navigate(location.pathname);
      
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setShowSignIn(false);
  };

  return (
      <div className='z-50 fixed top-0 min-h-screen flex justify-center items-center bg-black/50 h-screen w-screen backdrop-blur-sm'>
      {isLoading && <Loader/>}
    <div className="flex justify-center items-center min-h-screen relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white via-white to-green-50 rounded-lg shadow-lg overflow-hidden w-[360px] md:w-[400px] max-w-full hover:shadow-xl transition-shadow duration-300 relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10">
          <motion.form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={Logoo} alt="RDental Logo" className="h-16" />
            </motion.div>
            <h2 className="text-green-700 text-center text-2xl font-bold mb-5 drop-shadow-sm">Login</h2>

            <motion.input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              required 
              className="p-3 border border-gray-400 rounded-md text-base focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              required 
              className="p-3 border border-gray-400 rounded-md text-base focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <motion.a
                href="/ForgetPassword"
                className="text-green-600 hover:text-green-700 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Forgot Password?
              </motion.a>
            </div>

            <motion.button 
              type="submit" 
              className="p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md cursor-pointer text-base hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              Login
            </motion.button>
            
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            {/* Login with Google Button */}
            <motion.button 
              type="button"
              className="p-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300 shadow-sm"
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Login with Google
            </motion.button>

            {/* New User Sign Up Link */}
            <div className="text-center mt-4">
              <span className="text-gray-600">New user? </span>
              <motion.a
                onClick={() => {setShowSignUp(true) ; setShowSignIn(false)}}
                className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Sign Up
              </motion.a>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import Logoo from '../assets/logoo.png';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { fireDB } from '../firebase/firebaseConfig';
import { Timestamp } from 'firebase/firestore';
import myContext from '../context/data/myContext';
import { useContext } from 'react';
import Loader from './Loader';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate();
  const { setShowSignIn, setShowSignUp, isLoading, setIsLoading, setIsUserLoggedIn ,setCurrentUserId, setUser} = useContext(myContext);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleGoogleSignUp = async () => {
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
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Then update app state
      setIsUserLoggedIn(true);
      setCurrentUserId(user.uid);
      setUser(result.user);
      setShowSignUp(false);
      window.location.reload();

      toast.success('User Signed up successfully', {
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
      console.error('Google Sign-Up Error:', error);
      
      // Specific error handling
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Sign-up popup was closed. Please try again.', {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else if (error.code === 'auth/cancelled-popup-request') {
        toast.info('Sign-up request was cancelled. Please try again.', {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.error('Authentication failed. Please try again.', {
          position: "bottom-right",
          autoClose: 2000,
        });
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
      // Validation checks
      if (formData.password !== formData.confirmPassword) {
        setIsLoading(false);
        toast.error("Password and Confirm Password do not match");
        return;
      }

      if (formData.email === "" || formData.password === "" || formData.confirmPassword === "" || formData.fullname === "") {
        setIsLoading(false);
        toast.error("All fields are required");
        return;
      }

      const users = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const user = {
        uid: users.user.uid,
        displayName: formData.fullname,
        email: formData.email,
        wishlist: [],
        orders: [],
        carts: [],
        time: Timestamp.now()
      }

      // Create user document with UID
      const userDoc = doc(fireDB, "users", user.uid);
      await setDoc(userDoc, user);

      setIsLoading(false);
      setShowSignUp(false);
      setShowSignIn(true);
      toast.success("User registered successfully", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Reset form fields
      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    if(location.pathname !== '/'){
      setShowSignUp(false);
      navigate('/');
    }
    setShowSignUp(false);
  };

  return (
    <div className='z-50 fixed top-0 min-h-screen flex justify-center items-center bg-black/50 h-screen w-screen backdrop-blur-sm'>
      {isLoading && <Loader />}
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
              <h2 className="text-green-700 text-center text-2xl font-bold mb-5 drop-shadow-sm">Sign Up</h2>
              <motion.input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="p-3 border border-gray-400 rounded-md text-base focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />
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
              <motion.input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="p-3 border border-gray-400 rounded-md text-base focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md cursor-pointer text-base hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              {/* Sign up with Google Button */}
              <motion.button
                type="button"
                className="p-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                onClick={handleGoogleSignUp}
                whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </motion.button>

              {/* Already have an account Link */}
              <div className="text-center mt-4">
                <span className="text-gray-600">Already have an account? </span>
                <motion.a
                  onClick={() => { setShowSignIn(true); setShowSignUp(false) }}
                  className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign In
                </motion.a>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
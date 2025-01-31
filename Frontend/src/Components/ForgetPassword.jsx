import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import Logoo from '../assets/logoo.png';
import {sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useContext } from "react";
import myContext from "../context/data/myContext";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setShowSignIn } = useContext(myContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth,email,{
        url: import.meta.env.VITE_APP_URL || "http://localhost:5173/"
    });
    try {
      // Here you would typically make an API call to handle password reset
      // For now, just showing a success message
      toast.success('Password reset link sent to your email', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error(`Failed to send reset link: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <motion.img
            src={Logoo}
            alt="RDental Logo"
            className="h-20 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            Forgot Password?
          </h2>
          <p className="mt-4 text-center text-sm text-gray-600 max-w-sm">
            Don&apos;t worry! It happens. Please enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>
        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <motion.input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Reset Link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </div>

          <div className="text-center mt-4 cursor-pointer">
            <motion.div
              // href="/login"
              onClick={() => {
                navigate('/')
                setShowSignIn(true)
              }
              } 
              className="text-sm text-green-600 hover:text-green-700 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              ← Back to Login
            </motion.div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;

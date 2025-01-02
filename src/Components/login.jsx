import React, { useState } from 'react';
import Logoo from '../assets/logoo.png';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic here
    console.log(formData);
  };

  return (
    <div className='z-50 fixed top-0 min-h-screen flex justify-center items-center bg-black/50 h-screen w-screen backdrop-blur-sm'>
    <div className="flex justify-center items-center min-h-screen ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white via-white to-green-50 rounded-lg shadow-lg overflow-hidden w-[400px] max-w-full hover:shadow-xl transition-shadow duration-300"
      >
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
            <motion.button 
              type="submit" 
              className="p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md cursor-pointer text-base hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <motion.button 
              type="button"
              className="p-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Login with Google
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default Login;

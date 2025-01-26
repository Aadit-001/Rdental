import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import myContext from '../context/data/myContext';

const Profile = () => {
  const { setIsUserLoggedIn, setShowProfile, setIsLoading } = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  //isme changes karne hai
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user] = useState(storedUser || {
    name: "Guest User",
    email: "guest@example.com",
    location: "Not specified",
    profilePhoto: "https://via.placeholder.com/150"
  });

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowProfile]);

  // logout button 
  const Logout = () => {
    setIsLoading(true);
    // Clear all auth-related states
    localStorage.clear();
    setIsUserLoggedIn(false);
    setShowProfile(false);
    setIsLoading(false);

    // Navigate to home if not already there
    if (location.pathname !== '/') {
      navigate('/');
    }
    toast.success('Logged out successfully', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="pt-1 mr-6 w-[20vw] bg-black/1 fixed top-0 right-0 z-40" ref={profileRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-20 mx-auto"
      >
        <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden h-[100%] w-[99%]">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <div className="flex items-center space-x-6">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={user?.providerData?.[0]?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold">{user?.providerData?.[0]?.displayName || "Guest User"}</h1>
                <p className="opacity-90">{user?.providerData?.[0]?.email || "No email available"}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Link to="/myOrders" className="flex items-center w-full">
                <svg
                  className="w-6 h-6 text-green-600 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">My Orders</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={Logout}
            >
              <div className="flex items-center w-full">
                <svg
                  className="w-6 h-6 text-green-600 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Logout</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

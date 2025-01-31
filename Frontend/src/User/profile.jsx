import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import myContext from '../context/data/myContext';


const Profile = () => {
  const { setIsUserLoggedIn, setShowProfile,setIsLoading } = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();
    const profileRef = useRef(null);

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
  //isme changes karne hai
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user] = useState(storedUser || {
    name: "Guest User",
    email: "guest@example.com",
    location: "Not specified",
    profilePhoto: "https://via.placeholder.com/150"
  });

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
    <div className=" pt-1 mr-6  w-full h-full bg-transparent fixed top-0 z-40 " onClick={() => setShowProfile(false)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-20 mx-auto"
      >
        <div className="bg-gray-100 text-white rounded-2xl shadow-xl overflow-hidden  w-[20%] fixed right-10">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <div className="flex items-center space-x-6 h-[100%] w-[100%]">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={user?.providerData?.[0]?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold">{user?.providerData?.[0]?.displayName || user?.displayName || "Guest User"}</h1>
                <p className="opacity-90">{user?.providerData?.[0]?.email || user?.email || "No email available"}</p>
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
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Link to="/privacy-policy" className="flex items-center w-full">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Privacy Policy
                </span>
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center font-medium"
              onClick={Logout}
            >
              <svg
                className="w-6 h-6 mr-3"
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
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user] = useState(storedUser || {
    name: "Guest User",
    email: "guest@example.com",
    location: "Not specified",
    profilePhoto: "https://via.placeholder.com/150"
  });


  // logout button click krne ke baad logout to ho rha h par redirect nhi ho rha login pe
  const Logout = () => {
    localStorage.clear();
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
    navigate('/login');
  };

  return (
    <div className=" pt-1 mr-6  w-[20vw] bg-black/1 fixed top-0 right-0 z-40 ">
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
                src={user.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="opacity-90">{user.email}</p>
                <p className="opacity-90 flex items-center mt-1">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {user.location}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Link to="/orders" className="flex items-center w-full">
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

            {localStorage.getItem('user') && (
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
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

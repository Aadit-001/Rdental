import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyCart = () => {
  return (
    <motion.div 
      initial={{ borderWidth: 0 }}
      animate={{ 
        borderWidth: 2,
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/80 to-gray-200/70 flex items-center justify-center px-4 py-24 border-teal-500"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <svg 
            className="w-40 h-40 mx-auto relative"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              stroke="url(#gradient)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-0"
              style={{ filter: 'blur(1px)' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <motion.stop
                  offset="0%"
                  animate={{
                    stopColor: ["#14B8A6", "#10B981", "#14B8A6"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.stop
                  offset="100%"
                  animate={{
                    stopColor: ["#10B981", "#14B8A6", "#10B981"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-blue-900 mb-4"
        >
          Your Cart is Empty
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8"
        >
          Looks like you haven't added any dental supplies to your cart yet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 "
        >
          <Link
            to="/"
            className="inline-block relative px-6 py-3 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden text-white relative z-10"
          >
            <span className="relative z-10 text-white">Browse Products</span>
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          </Link>

          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="/wishlist"
              className="text-teal-600 hover:text-teal-800 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              View Wishlist
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-gray-500"
        >
          Need help? Contact our support team at{" "}
          <a href="mailto:rdental96@gmail.com" className="text-teal-600 hover:text-teal-800">
            rdental96@gmail.com
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;

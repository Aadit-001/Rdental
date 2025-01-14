import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmptyOrderPage = () => {
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
            className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/80 to-gray-200/70 flex items-center justify-center px-6 py-12 border-teal-500"
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
                            d="M12 2C7.58 2 4 5.58 4 10c0 2.03.76 3.87 2 5.28V20c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4.72c1.24-1.41 2-3.25 2-5.28 0-4.42-3.58-8-8-8zm-1 17h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2z"
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
                            d="M12 2C7.58 2 4 5.58 4 10c0 2.03.76 3.87 2 5.28V20c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4.72c1.24-1.41 2-3.25 2-5.28 0-4.42-3.58-8-8-8zm-1 17h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2z"
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
                    You have no orders yet!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-8"
                >
                    It looks like you haven't placed an order. Check out our latest dental products to get started!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                >
                    <Link
                        to="/products"
                        className="inline-block relative px-6 py-3 rounded-lg shadow-md 
                            before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                            before:transition-all before:duration-500 hover:before:opacity-0
                            after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                            after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                            transform hover:scale-105 transition-all duration-300 ease-in-out
                            hover:shadow-lg hover:shadow-green-200 overflow-hidden text-white relative z-10"
                    >
                        <span className="relative z-10 text-white">Browse Products</span>
                    </Link>

                    <div className="flex justify-center gap-4 mt-6">
                        <Link
                            to="/contact"
                            className="text-teal-600 hover:text-teal-800 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 5l-5 3L3 8z"
                                />
                            </svg>
                            Contact Support
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-sm text-gray-500"
                >
                    Need help? Contact us at{" "}
                    <a href="mailto:rdental96@gmail.com" className="text-teal-600 hover:text-teal-800">
                        rdental96@gmail.com
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EmptyOrderPage;

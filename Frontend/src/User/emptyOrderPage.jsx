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
                            d="M9 2.5a2 2 0 112 0V5a2 2 0 01-2 2h-4a2 2 0 01-2-2V2.5a2 2 0 011.5-2h4a2 2 0 012 2zm-1 0a2 2 0 100 4 2 2 0 000-4z"

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
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2v-6h2v6zm4 4h-2v-2h2v2zm0-4h-2v-6h2v6z"

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
                    It looks like you haven&apos;t placed an order. Check out our latest dental products to get started!
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
                            hover:shadow-lg hover:shadow-green-200 overflow-hidden text-white z-10"
                    >
                        <span className="relative z-10 text-white">Browse Products</span>
                    </Link>
                    
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

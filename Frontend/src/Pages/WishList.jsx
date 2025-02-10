import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import WishlistProductCard from '../Components/WishlistProductCard';
import myContext from '../context/data/myContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WishList() {

  // const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setWishlistEmpty] = useState(false);

  const { getWishlist, addToWishlist, removeFromWishlist, wishlistItems, setWishlistItems,addToCart } = useContext(myContext);
  
  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const user = JSON.parse(localStorage.getItem('user'));
  //       if (!user) {
  //         setIsLoading(false);
  //         return;
  //       }
  //       const items = await getWishlist(user.uid);
  //       setWishlistEmpty(items.length === 0);
  //       setWishlistItems(items || []);
  //     } catch (error) {
  //       console.error("Error fetching wishlist:", error);
  //       toast.error("Failed to load wishlist");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
    
  //   fetchWishlist();
  // }, [getWishlist, addToWishlist,removeFromWishlist,addToCart]);

  useEffect(() => {
    let isMounted = true;

    const fetchWishlist = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                setIsLoading(false);
                return;
            }
            
            const items = await getWishlist(user.uid);
            
            if (isMounted) {
                setWishlistEmpty(items.length === 0);
                setWishlistItems(items || []);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist");
            
            if (isMounted) {
                setIsLoading(false);
            }
        }
    };
    
    fetchWishlist();

    // Cleanup function
    return () => {
        isMounted = false;
    };
}, [getWishlist]); // Only depend on getWishlist

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col relative bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)]"
      >
        <div className="container mx-auto  md:px-24 pt-28 flex-grow relative">
          <div className="flex">
            {/* Vertical Poster Section - 20% width */}
            <div className="w-1/5 mr-2 mb-20 mt-10 hidden md:block">
              <div className="relative top-8 bg-gradient-to-b from-green-400 to-green-500 rounded-lg p-6 text-white h-[80vh] flex flex-col justify-between shadow-xl">
                <div>
                  <h2 className="text-2xl font-bold mb-4 animate-bounce hover:scale-105 transition-transform duration-300">Special Offers</h2>
                  <p className="mb-4 hover:text-green-100 transition-colors duration-300 animate-pulse">Save up to 50% on selected items in your wishlist!</p>
                  <div className="border-t border-white/20 my-4"></div>
                  <ul className="space-y-2">
                    <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2 animate-pulse">💎</span>
                      <span className="hover:font-bold transition-all duration-300">Exclusive Deals</span>
                    </li>
                    <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2 animate-bounce">🎁</span>
                      <span className="hover:font-bold transition-all duration-300">Special Discounts</span>
                    </li>
                    <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2 animate-pulse">⚡</span>
                      <span className="hover:font-bold transition-all duration-300">Flash Sales</span>
                    </li>
                  </ul>
                </div>
                <Link to="/" className="bg-white text-green-600 py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Main Content - 80% width */}
            <div className="w-screen md:w-4/5 ">
              <h1 className="text-4xl font-bold text-gray-600 mb-8 text-center mr-10 animate-fade-in-down relative group">
                <span className="md:inline-block md:pl-0 pl-8">My WishList</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </h1>

              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : wishlistItems?.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50"
                >
                  <div className="text-gray-500 mb-4">
                    <svg className="w-24 h-24 mx-auto animate-pulse text-green-400 hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your wishlist is empty</h2>
                  <p className="text-gray-600 mb-6">Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
                  <Link to="/">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center h-12 px-6 relative py-3 rounded-lg shadow-md 
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                      before:transition-all before:duration-500 hover:before:opacity-0
                      after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                      after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                      transform hover:scale-105 transition-all duration-300 ease-in-out
                      hover:shadow-lg hover:shadow-green-200 overflow-hidden text-white"
                    >
                      <span className="mr-2 relative z-10">Browse Items</span>
                      <svg
                        className="w-5 h-5 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              ) : (
                  <div>
                    {wishlistItems.map((productId) => (
                      <div key={productId} className="mb-10 md:mb-0 md:px-0">
                        <WishlistProductCard
                          productId={productId}
                        />
                      </div>
                    ))}
                  <div className="flex justify-center mt-10 mb-10">
                    <Link to="/">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center h-12 px-6 relative py-3 rounded-lg shadow-md 
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                        before:transition-all before:duration-500 hover:before:opacity-0
                        after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                        after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                        transform hover:scale-105 transition-all duration-300 ease-in-out
                        hover:shadow-lg hover:shadow-green-200 overflow-hidden text-white" 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                        <span className="mr-2 relative z-10">Add more to wishlist</span>
                        <svg
                          className="w-5 h-5 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          >
                          <path
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default WishList;

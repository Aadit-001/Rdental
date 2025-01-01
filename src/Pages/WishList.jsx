import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function WishList() {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedItems = localStorage.getItem('wishlistItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Function to remove item from wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col relative bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)]"
    >
      <div className="container mx-auto px-4 pt-28 flex-grow relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-500 text-center">My Wishlist</h1>
        </div>
        
        {wishlistItems.length === 0 ? (
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
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Browse Items
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-300"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold">${item.price}</span>
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default WishList;

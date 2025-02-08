import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import myContext from '../context/data/myContext';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

const RelatedProductCard = ({ id,title, description, price, image, catagory, mrp, rating ,noOfRatings}) => {
  const {addToWishlist, removeFromWishlist, currentUserId, isUserLoggedIn, getWishlist,addToCart,removeFromCart,getCart,setCartItems} = useContext(myContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  const savings = Math.round(((mrp - price) / mrp) * 100);

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/products/${catagory}/${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (isUserLoggedIn && currentUserId) {
        try {
          const wishlistItems = await getWishlist(currentUserId);
          setIsLiked(wishlistItems.includes(id)); 
        } catch (error) {
          console.error('Error checking wishlist status:', error);
        }
      }
    };
    
    checkWishlistStatus();
  }, [currentUserId, id, isUserLoggedIn, getWishlist]);

  useEffect(() => {
    const checkCartStatus = async () => {
      if (isUserLoggedIn && currentUserId) {
        try {
          const cartItems = await getCart(currentUserId);
          setIsAddedToCart(cartItems.some(item => item.productId === id));
          setCartItems(cartItems);
        } catch (error) {
          console.error('Error checking cart status:', error);
        }
      }
    };
    
    checkCartStatus();
  }, [currentUserId, id, isUserLoggedIn, getCart, setCartItems]);

  const handleLike = async () => {
    if(!isUserLoggedIn){
      toast.error('Please login to like products');
      return;
    }
    try {
      if(isLiked){
        setIsLiked(false);
        await removeFromWishlist(id, currentUserId);
      } else {
        setIsLiked(true);
        await addToWishlist(id, currentUserId);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      // Revert the like state if operation failed
      setIsLiked(!isLiked);
      toast.error('Failed to update wishlist');
    }
  }

  const handleAddToCart = async (productId) => {
    if(!isUserLoggedIn){
      toast.error('Please login to add products to cart');
      return;
    }
    try {
      if(isAddedToCart){
        await removeFromCart(productId, currentUserId);
        setIsAddedToCart(false);
        toast.success('Product removed from cart');
        setCartItems(prev => prev.filter(item => item.productId !== productId));
      } else {
        await addToCart(productId, currentUserId);
        setIsAddedToCart(true);
        toast.success('Product added to cart successfully');
        setCartItems(prev => [...prev, { productId, quantity: 1 }]);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  return (
    <div 
      className="relative w-full bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group"
      onClick={handleClick}
    >
      {/* Image Container - More Compact */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {savings > 0 && (
          <span className="absolute top-2 right-2 bg-green-300 text-white text-xs px-2 py-1 rounded">
            {savings}% OFF
          </span>
        )}
      </div>

      {/* Product Details - More Compact */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-900">₹{price}</span>
            {mrp > price && (
              <span className="text-xs text-gray-500 line-through">₹{mrp}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`text-sm ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({noOfRatings || 0})</span>
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="flex justify-between items-center mt-2 space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isLiked ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {isLiked ? '♥' : '♡'}
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(id);
            }}
            className={`flex-1 text-xs py-2 rounded transition-colors duration-200 ${
              isAddedToCart 
                ? 'bg-gray-600 text-white hover:bg-gray-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isAddedToCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

RelatedProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  catagory: PropTypes.string,
  mrp: PropTypes.number.isRequired,
  rating: PropTypes.number,
  noOfRatings: PropTypes.number,
  noOfReviews: PropTypes.number,
  reviews: PropTypes.array,
};

export default RelatedProductCard;

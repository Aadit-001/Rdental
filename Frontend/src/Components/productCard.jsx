import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import myContext from '../context/data/myContext';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

const ProductCard = ({ id, title, description, price, image, catagory, mrp, rating, noOfRatings }) => {
  const numericRating = Number(rating);
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

  // Render rating stars
  const renderStars = () => {
    const fullStars = Math.floor(numericRating);
    const halfStar = numericRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-500">★</span>
        ))}
        {halfStar === 1 && <span className="text-yellow-500">½</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };

  //lets understand the logic of this part
  //ye use ho raha hai taki agar page refresh hoye toh bhi jo liked product hai wo liked hi rahe
  //and jo cart mai add ho raha hai wo cart mai add ho raha
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const wishlistItems = await getWishlist(user.uid);
          setIsLiked(wishlistItems.includes(id)); 
        } catch (error) {
          console.error('Error checking wishlist status:', error);
        }
      }
    };
    
    checkWishlistStatus();
  }, [ getWishlist]);

  useEffect(() => {
    const checkCartStatus = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const cartItems = await getCart(user.uid);
          setIsAddedToCart(cartItems.some(item => item.productId === id));
          setCartItems(cartItems);
        } catch (error) {
          console.error('Error checking cart status:', error);
        }
      }
    };
    
    checkCartStatus();
  }, [getCart, setCartItems]);

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      toast.error('Please login to like products');
      return;
    }
    try {
      if(isLiked){
        setIsLiked(false);
        await removeFromWishlist(user.uid,id);
      } else {
        setIsLiked(true);
        await addToWishlist(id, user.uid);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      // Revert the like state if operation failed
      setIsLiked(!isLiked);
      toast.error('Failed to update wishlist');
    }
  }

  const handleAddToCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      toast.error('Please login to add products to cart');
      return;
    }
    try {
      if(isAddedToCart){
        await removeFromCart(productId, user.uid);
        setIsAddedToCart(false);
        toast.success('Product removed from cart');
        setCartItems(prev => prev.filter(item => item.productId !== productId));
      } else {
        await addToCart(productId, user.uid);
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
      className={`w-56 h-96 rounded-lg shadow-lg overflow-hidden bg-white flex flex-col
      hover:cursor-pointer hover:scale-105
      transition-all duration-300 `}
      onClick={handleClick}
    >
      <div className="relative h-48 flex-shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isLiked ? 'bg-green-500' : 'bg-gray-200'
          } transition-colors duration-300`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill={isLiked ? "white" : "none"}
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
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-lg font-bold text-gray-800 mb-1 truncate" title={title}>
            {title}
          </h2>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {renderStars()}
              <span className="ml-2 text-sm text-gray-600">
                {numericRating.toFixed(1)} {noOfRatings ? `(${noOfRatings})` : ''}
              </span>
            </div>
          </div>
          <div className="relative">
            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-2">
            

            <span className="text-base font-bold text-gray-900">₹{price}</span>
            <span className="text-sm text-gray-400 line-through">₹{mrp}</span>

            <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
              Save {savings}%</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(id);
            }}
            className={`w-full py-1.5 ${isAddedToCart ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'} text-white text-sm rounded-lg transition-colors duration-300`}
          >
            {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  catagory: PropTypes.string.isRequired,
  mrp: PropTypes.number.isRequired,
  rating: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  noOfRatings: PropTypes.number.isRequired
};

export default ProductCard;

import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB as fireDb } from '../firebase/firebaseConfig';
import myContext from '../context/data/myContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';


const WishlistProductCard = ({ productId }) => {
  const { removeFromWishlist, currentUserId, setWishlistItems, addToCart, removeFromCart, isUserLoggedIn, getCart, setCartItems } = useContext(myContext);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async() => {
      try {
        if (!productId) return;
        const productDoc = await getDoc(doc(fireDb, "products", productId));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.error('Product not found:', productId);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    const checkCartStatus = async () => {
      if (isUserLoggedIn && currentUserId) {
        try {
          const cartItems = await getCart(currentUserId);
          setIsAddedToCart(cartItems.some(item => item.productId === productId));
          setCartItems(cartItems);
        } catch (error) {
          console.error('Error checking cart status:', error);
        }
      }
    };

    checkCartStatus();
  }, [isUserLoggedIn, currentUserId, productId, getCart, setCartItems]);

  if (!product) return null;

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/products/${product.catagory}/${product.title}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId,currentUserId);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      toast.success('Product removed from wishlist', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      toast.error('Error removing product from wishlist');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      if(isAddedToCart){
        await removeFromCart(productId, currentUserId);
        setCartItems(prev => prev.filter(item => item.productId !== productId));
        setIsAddedToCart(false);
      } else {
        await addToCart(productId, currentUserId);
        setCartItems(prev => [...prev, { productId, quantity: 1 }]);
        setIsAddedToCart(true);
        toast.success('Product added to cart successfully', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  return (
    <div 
      className="w-full cursor-pointer max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] bg-white mb-4"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="relative w-40 h-40">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-1" title={product.title}>
                {product.title}
              </h2>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(product.id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="relative">
            <p 
              onClick={(e) => {
                e.stopPropagation();
                setShowFullDescription(!showFullDescription);
              }}
              className={`text-gray-600 text-xs mb-2 cursor-pointer ${!showFullDescription ? 'line-clamp-2' : 'whitespace-pre-wrap'}`}
            >
              {product.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900">&#x20B9;{product.price}</span>
              <span className="text-xs text-gray-400 line-through">&#x20B9;{product.mrp}</span>
              <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
                Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(productId);
                handleRemove(product.id);
              }}
              className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

WishlistProductCard.propTypes = {
  productId: PropTypes.string.isRequired
};

export default WishlistProductCard;

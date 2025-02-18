import React, { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo 
} from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import myContext from '../context/data/myContext';

const HorizontalProductCard = ({ id, quantity }) => {
  const navigate = useNavigate();
  const { 
    removeFromCart,
    currentUserId,
    setCartItems,
    updatequantity, 
    products 
  } = React.useContext(myContext);

  // State Management
  const [productData, setProductData] = useState(null);
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Refs and Timeouts
  const updateTimeout = useRef(null);

  // Memoized Product Finder
  const findProduct = useCallback(() => {
    return products.find(product => product.id === id) || null;
  }, [id, products]);

  // Product Loading Effect
  useEffect(() => {
    const loadProduct = () => {
      try {
        const product = findProduct();
        if (product) {
          setProductData(product);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('Product loading error:', error);
      }
    };
    loadProduct();
  }, [findProduct]);

  // Quantity Sync Effect
  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  // Quantity Change Handler
  const handleQuantityChange = useCallback(async (productId, newQuantity) => {
    if (newQuantity < 1 || isUpdating) return;
    
    // Clear any pending updates
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    // Optimistic UI Update
    setLocalQuantity(newQuantity);
    
    updateTimeout.current = setTimeout(async () => {
      setIsUpdating(true);
      try {
        // Optimistic Cart Update
        setCartItems(prev => 
          prev.map(item => 
            item.productId === productId 
              ? { ...item, quantity: newQuantity } 
              : item
          )
        );

        // Database Update
        await updatequantity(productId, currentUserId, newQuantity);
        
        // toast.success('Quantity updated', {
        //   position: "bottom-right",
        //   autoClose: 1000,
        //   theme: "colored",
        // });
      } catch (error) {
        // Rollback on Error
        setLocalQuantity(quantity);
        setCartItems(prev => 
          prev.map(item => 
            item.productId === productId 
              ? { ...item, quantity } 
              : item
          )
        );
        
        console.error('Quantity update failed:', error);
        toast.error('Failed to update quantity');
      } finally {
        setIsUpdating(false);
      }
    }, 500);
  }, [isUpdating, currentUserId, updatequantity, setCartItems, quantity]);

  // Remove Product Handler
  const handleRemove = useCallback(async (productId) => {
    try {
      setIsRemoving(true);
      await removeFromCart(productId, currentUserId);
      
      setCartItems(prev => 
        prev.filter(item => item.productId !== productId)
      );
      
      toast.success('Product removed', {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
      });
    } catch (error) {
      console.error('Remove product failed:', error);
      toast.error('Failed to remove product');
    } finally {
      setIsRemoving(false);
    }
  }, [currentUserId, removeFromCart, setCartItems]);

  // Navigation Handler
  const handleProductNavigation = useCallback(() => {
    if (!productData) return;
    
    setTimeout(() => {
      navigate(`/products/${productData.catagory}/${productData.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, [productData, navigate]);

  // Derived Calculations
  const savedAmount = useMemo(() => 
    productData ? productData.mrp - productData.price : 0, 
    [productData]
  );

  const savingsPercentage = useMemo(() => 
    productData 
      ? ((savedAmount / productData.mrp) * 100).toFixed(0) 
      : '0', 
    [savedAmount, productData]
  );

  // Star Rating Renderer
  const renderStarRating = useMemo(() => {
    if (!productData) return null;
    return (
      <div className="flex items-center mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${star <= productData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  }, [productData]);

  // Loading State
  if (!productData) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 rounded-lg shadow-lg bg-white">
        <div className="animate-pulse flex space-x-4">
          <div className="w-40 h-40 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full cursor-pointer max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] bg-white mb-4"
      onClick={handleProductNavigation}
    >
      {isRemoving && (
        <div className="absolute inset-0 z-10 bg-black/40 text-white backdrop-blur-sm h-full w-full flex justify-center items-center">
          Removing.....
        </div>
      )}
      <div className="flex">
        <div className="relative w-40 h-40 md:h-44">
          <img 
            src={productData.imageUrl} 
            alt={productData.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 
                className="text-xl font-bold text-gray-800 mb-2" 
                title={productData.title}
              >
                {productData.title}
              </h2>
              {renderStarRating}
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
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
              className={`text-gray-600 text-sm mb-4 cursor-pointer ${!showFullDescription ? 'line-clamp-2' : 'whitespace-pre-wrap'}`}
            >
              {productData.description}
            </p>
          </div>
          <div className="flex justify-between items-center flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">&#x20B9;{productData.price}</span>
              <span className="text-sm text-gray-400 line-through">&#x20B9;{productData.mrp}</span>
              <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
                Save {savingsPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(id, localQuantity - 1);
                }}
                disabled={localQuantity <= 1 || isUpdating}
                className={`px-4 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300 ${
                  (localQuantity <= 1 || isUpdating) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className={`font-bold ${localQuantity <= 1 ? 'text-gray-400' : 'text-red-500 animate-pulse'}`}>-</span>
              </button>
              <span className="px-4">{localQuantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(id, localQuantity + 1);
                }}
                disabled={isUpdating}
                className={`px-4 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300 ${
                  isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="text-green-500 font-bold animate-pulse">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HorizontalProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default React.memo(HorizontalProductCard);
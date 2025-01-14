import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import  myContext  from '../context/data/myContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/firebaseConfig';

const HorizontalProductCard = ({ id, quantity }) => {
  const { removeFromCart,currentUserId ,setCartItems,updatequantity} = useContext(myContext);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCartProduct = async () => {
      try{
        const productRef = doc(fireDB,"products",id);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          setProductData({ id: productDoc.id, ...productDoc.data() });
        } else {
          throw new Error('Product not found');
        }
      }catch(error){
        console.log(error);
      }
    }
    getCartProduct();
  }, [id]);

  const handleQuantityChange = async (id,newQuantity) => {
    if (newQuantity < 1) return;
    
    try{
      await updatequantity(id, currentUserId, newQuantity);
      setCartItems(prev => {
        const updatedItems = prev.map(item => 
          item.productId === id 
            ? { ...item, quantity: newQuantity, lastUpdated: Date.now() }
            : item
        );
        return updatedItems.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
      });
      toast.success('Product quantity updated');
    }catch(error){  
      console.error(error);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = (id)  => {
    try{
      removeFromCart(id, currentUserId);
      setCartItems(prev => prev.filter(item => item.productId !== id));
      toast.success('Product removed from cart');
    }catch(error){
      console.log(error);
      toast.error('Failed to remove product');
    }
  };

  const handleClick = () => {
    if (!productData) return;
    
    setTimeout(() => {
      navigate(`/products/${productData.catagory}/${productData.name}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  if (!productData) {
    return <div className="w-full max-w-4xl mx-auto p-4 rounded-lg shadow-lg bg-white">
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
    </div>;
  }

  const savedAmount = productData.mrp - productData.price;
  const savingsPercentage = ((savedAmount) / productData.mrp * 100).toFixed(0);

  return (
    <div 
      className="w-full cursor-pointer max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] bg-white mb-4"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="relative w-40 h-40">
          <img 
            src={productData.imageUrl} 
            alt={productData.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2" title={productData.title}>
                {productData.title}
              </h2>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">${productData.price}</span>
              <span className="text-sm text-gray-400 line-through">${productData.mrp}</span>
              <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
                Save {savingsPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(id,quantity - 1);
                }}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="text-red-500 font-bold animate-pulse">-</span>
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(id,quantity + 1);
                }}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
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

export default HorizontalProductCard;

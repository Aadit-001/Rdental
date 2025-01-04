import { useState } from "react";

const HorizontalProductCard = ({ product, onDelete, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);
    onQuantityChange?.(updatedQuantity);
  };

  const savedAmount = product.originalPrice - product.price;
  const savingsPercentage = ((savedAmount) / product.originalPrice * 100).toFixed(0);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative overflow-hidden">
      
      <div className="flex gap-6 relative">
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-teal-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {product.description}
              </p>
            </div>
            
            <button 
              onClick={() => onDelete(product.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-teal-600">
                ${product.price.toFixed(2)}
              </span>
              {savedAmount > 0 && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                    Save {savingsPercentage}%
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-gray-700">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;

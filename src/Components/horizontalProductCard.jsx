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
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
                className="w-8 h-8 flex items-center justify-center text-teal-600 hover:text-white hover:bg-teal-600 rounded-md transition-colors active:scale-90 transform transition-transform duration-100"
              >
                -
              </button>
              <span className="w-8 text-center text-gray-700">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-teal-600 hover:text-white hover:bg-teal-600 rounded-md transition-colors active:scale-90 transform transition-transform duration-100"
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

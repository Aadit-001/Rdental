import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const WishlistProductCard = ({ title, description, price, image, onRemove, catagory, mrp, rating = 0 }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const savings = Math.round(((mrp - price) / mrp) * 100);

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/products/${catagory}/${title}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] bg-white mb-4"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="relative w-48 h-48">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2" title={title}>
                {title}
              </h2>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
              {description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">${price}</span>
              <span className="text-sm text-gray-400 line-through">${mrp}</span>
              <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
                Save {savings}%
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  catagory: PropTypes.string.isRequired,
  mrp: PropTypes.number.isRequired,
  rating: PropTypes.number
};

export default WishlistProductCard;

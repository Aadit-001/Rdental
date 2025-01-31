/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Categories = ({path, image, name}) => {
    

  return (
      <div className="flex flex-row justify-between gap-4 overflow-x-auto">
        
          <Link 
            to={path}
            className="flex flex-col items-center group flex-shrink-0"
          >
            <div className="w-40 h-40 overflow-hidden rounded-lg mb-3">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-base font-bold text-gray-800 text-center">
              {name}
            </h3>
          </Link>
      </div>
  );
};

export default Categories; 
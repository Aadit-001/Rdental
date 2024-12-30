import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [
        {
          id: 1,
          name: 'General',
          image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=200',
          path: '/products/general'
        },
        {
          id: 2, 
          name: 'Restoratives',
          image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=200',
          path: '/products/restoratives'
        },
        {
          id: 3,
          name: 'Equipment',
          image: 'https://images.unsplash.com/photo-1516973442404-e9e31360db15?q=80&w=200',
          path: '/products/equipment'
        },
        {
          id: 4,
          name: 'Instruments',
          image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=200',
          path: '/products/instruments'
        },
        {
          id: 5,
          name: 'Endodontics',
          image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=200',
          path: '/products/endodontics'
        },
        {
          id: 6,
          name: 'Sterilization',
          image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200',
          path: '/products/sterilization'
        },
        {
          id: 7,
          name: 'Disposables',
          image: 'https://images.unsplash.com/photo-1570612861542-284f4c12e75f?q=80&w=200',
          path: '/products/disposables'
        }
      ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Categories</h2>
      <div className="flex flex-row justify-between gap-4 overflow-x-auto">
        {categories.map((category) => (
          <Link 
            to={category.path}
            key={category.id}
            className="flex flex-col items-center group flex-shrink-0"
          >
            <div className="w-40 h-40 overflow-hidden rounded-lg mb-3">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-base font-bold text-gray-800 text-center">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories; 
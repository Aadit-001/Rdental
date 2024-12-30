import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './productCard';

const ProductSection = ({ title, path, bgColor }) => {
  // डेमो डेटा - बाद में डेटाबेस से फेच किया जाएगा
  const demoProducts = [
    {
      title: "Dental Chair",
      description: "Premium dental chair with adjustable positions and LED light",
      price: 299999.99,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
    },
    {
      title: "Dental Forceps",
      description: "High-quality stainless steel dental extraction forceps",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
    },
    {
      title: "Dental Mirror",
      description: "Double-sided dental mirror with ergonomic handle",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
    },
    {
      title: "Sterilizer Unit",
      description: "Advanced autoclave sterilizer for dental instruments",
      price: 49999.99,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
    },
    {
      title: "Dental Implants",
      description: "Premium quality dental implants with abutments",
      price: 2999.99,
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
    },
    {
      title: "Root Canal Files",
      description: "Complete set of endodontic files for root canal treatment",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50"
    },
    {
      title: "Dental Composite",
      description: "Light-cure dental composite for restorations",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
    },
    {
      title: "Surgical Kit",
      description: "Complete dental surgery instruments kit",
      price: 9999.99,
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
    },
    {
      title: "Dental X-Ray",
      description: "Digital dental X-ray machine with sensor",
      price: 149999.99,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
    },
    {
      title: "Dental Burs",
      description: "Premium diamond dental burs set",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
    }
  ];

  return (
    <div className={`${bgColor} p-6 my-4 rounded-lg`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        <Link 
          to={path}
          className="group flex items-center justify-center w-10 h-10 hover:bg-green-50 rounded-full transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6 text-green-500 transform transition-transform group-hover:translate-x-1"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
            />
          </svg>
        </Link>
      </div>
      
      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
        {demoProducts.map((product, idx) => (
          <div key={idx} className="flex-shrink-0 w-[250px]">
            <ProductCard
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
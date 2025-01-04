import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../Components/ProductCard';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [rating, setRating] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Sample product data
  const product = {
    id: 1,
    name: "Professional Dental Kit",
    description: "Complete dental care kit with premium quality tools and accessories",
    price: 299.99,
    mrp: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    brochure: "dental-kit-brochure.pdf",
    features: [
      "Professional Grade Tools",
      "Sterilized Equipment",
      "Premium Quality Materials",
      "Ergonomic Design",
      "Complete Kit"
    ]
  };

  const specifications = [
    {
      title: "Product Specifications",
      content: "Detailed technical specifications of the product..."
    },
    {
      title: "Usage Instructions",
      content: "Step by step guide on how to use the product..."
    },
    {
      title: "Safety Guidelines",
      content: "Important safety information and precautions..."
    },
    {
      title: "Maintenance",
      content: "Instructions for proper maintenance and care..."
    },
    {
      title: "Warranty Information",
      content: "Details about product warranty and coverage..."
    },
    {
      title: "Package Contents",
      content: "List of items included in the package..."
    },
    {
      title: "Additional Information",
      content: "Other relevant product details and information..."
    }
  ];

  const relatedProducts = [
    // Sample related products data
    {
      id: 2,
      title: "Dental Cleaning Kit",
      description: "Professional cleaning tools for dental care",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    // Add more related products...
  ];

  const savings = ((product.mrp - product.price) / product.mrp * 100).toFixed(0);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Section - Image and Rating */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div 
                ref={imageRef}
                className="relative overflow-hidden cursor-zoom-in" 
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto rounded-lg mb-4"
                />
              </div>

              <AnimatePresence>
                {showZoom && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed top-[10%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl p-4"
                    style={{ width: '600px', height: '600px', overflow: 'hidden' }}
                  >
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute w-[200%] h-[200%]"
                        style={{
                          transform: `translate(-${mousePosition.x}%, -${mousePosition.y}%)`
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {product.brochure && (
                <button className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  View Brochure
                </button>
              )}
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Rate this Product</h3>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Product Details */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <span className="text-gray-400 line-through">${product.mrp}</span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  Save {savings}%
                </span>
              </div>

              {!showQuantityControls ? (
                <button 
                  onClick={() => setShowQuantityControls(true)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-center gap-4 bg-gray-100 p-2 rounded">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-white rounded shadow"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-white rounded shadow"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Specification Cards */}
            <div className="space-y-2">
              {specifications.map((spec, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-3 text-left font-semibold hover:bg-gray-50"
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  >
                    {spec.title}
                  </button>
                  {expandedCard === index && (
                    <div className="px-6 py-3 bg-gray-50">
                      {spec.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per item</span>
                  <span>${product.price}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-green-500 text-white py-2 rounded mb-2 hover:bg-green-600 transition-colors">
                Add to Cart
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                Place Order
              </button>
            </div>

            {/* Company Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Why Choose RDental?</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Premium Quality Products
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Expert Customer Support
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Fast & Secure Shipping
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  100% Satisfaction Guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../Components/ProductCard';
import demo from '../assets/demo.png';

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
    image: demo,
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
      const x = Math.min(Math.max(((e.pageX - left) / width) * 100, 0), 100);
      const y = Math.min(Math.max(((e.pageY - top) / height) * 100, 0), 100);
      
      setMousePosition({ x, y });
    }
  };

  const subtotal = product.price * quantity;
  const shipping = 15.0;
  const tax = (subtotal * 0.1).toFixed(2); //toFixed(2) to round to 2 decimal places,toFixed() returns a string
  const total = subtotal + shipping + Number(tax); //Number() to convert string to number

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
                    style={{ width: '700px', height: '600px', overflow:'hidden' }}
                  >
                    <div className="w-full h-full relative overflow-hidden"> 
                      <img //image kitna dikhega nhi dikhega zoom hone pe sab yahi se change hoga
                        src={product.image}
                        alt={product.name}
                        className="absolute w-[100%] h-[100%] object-contain" //yaha pe change karna hai 200% to 100% jisse pura image ka zoom dikhe
                        style={{
                          transform: 'scale(2)',
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {product.brochure && (
                <button className="w-full mt-6 relative px-6 py-2 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide">
                    View Brochure
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
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
                <span className="text-2xl font-bold text-black">${product.price}</span>
                <span className="text-gray-400 line-through">${product.mrp}</span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  Save {savings}%
                </span>
              </div>

              {!showQuantityControls ? (
                <button
                  onClick={() => setShowQuantityControls(true)}
                  className="w-full mt-6 relative px-6 py-2 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide">
                    Add to Cart
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="flex items-center justify-center gap-4 bg-gray-100 p-2 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-white rounded shadow hover:bg-red-100 transition-colors duration-300"
                  >
                    <span className="text-red-500 font-bold animate-pulse">-</span>
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-white rounded shadow hover:bg-green-100 transition-colors duration-300"
                  >
                    <span className="text-green-500 font-bold animate-pulse">+</span>
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
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
                Order Summary
              </h2>
              <div className="space-y-4">
                {/* Items Summary */}
                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Items ({quantity})</span>
                    <span className="font-medium">${subtotal}</span>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-gray-50 rounded-md p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Standard Shipping</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">${shipping}</span>
                  </div>
                  <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span>${tax}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      *Final tax will be calculated at checkout
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full mt-6 relative px-6 py-2 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide">
                  Proceed to Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </button>

              {/* Additional Information */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>

          {/* Company Features */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Why Choose <span className="text-green-500">R</span>-DENTAL?</h2>
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

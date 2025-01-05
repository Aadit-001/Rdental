import { useState, useEffect } from 'react';
import ProductSection from './Components/productSection';
import ProductCard from './Components/ProductCard';
import { useNavigate } from 'react-router-dom';
import demoImage from './assets/demo.png';
import Endodontics from './assets/Endodentics.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [restorativeSlide, setRestorativeSlide] = useState(0);
  const navigate = useNavigate();

  //ye bhi database se uthana hoga ******************************************************************************************************************
  const slides = [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80', // Dental office
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80', // Dental equipment
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80', // Dental tools
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80', // Dental chair
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80', // Replacing broken dental hygiene image
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80'  // Dental examination
  ];
  //**************************************************************************************************************************************************** */

  const restorativeImages = [
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80', // Dental equipment
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80', // Dental office
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80',  // Dental examination
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80', // Dental tools
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRestorativeSlide((prevSlide) =>
        prevSlide === restorativeImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  //ye bhi database se uthana hoga ******************************************************************************************************************
  const categories = [
    {
      id: 1,
      name: 'General',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=200',
      path: '/products/general',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    },
    {
      id: 2,
      name: 'Restoratives',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=200',
      path: '/products/restoratives',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    },
    {
      id: 3,
      name: 'Equipment',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200',
      path: '/products/equipment',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    },
    {
      id: 4,
      name: 'Instruments',
      image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=200',
      path: '/products/instruments',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    },
    {
      id: 5,
      name: 'Endodontics',
      image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=200',
      path: '/products/endodontics',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    },
    {
      id: 6,
      name: 'Sterilization',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200',
      path: '/products/sterilization',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    },
    {
      id: 7,
      name: 'Disposables',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200',
      path: '/products/disposables',
      products: [
        {
          id: 1,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          mrp: 149.99,
          image: demoImage
        },
      ]
    }
  ];
  //**************************************************************************************************************************************************** */

  //ye bhi database se uthana hoga ******************************************************************************************************************
  const bestSellers = [
    {
      id: 1,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      mrp: 149.99,
      image: demoImage
    },
    {
      id: 2,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      mrp: 149.99,
      image: demoImage
    },
    {
      id: 3,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      mrp: 149.99,
      image: demoImage
    },
    {
      id: 4,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      mrp: 149.99,
      image: demoImage
    },
    {
      id: 5,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      mrp: 149.99,
      image: demoImage
    }
]
  //**************************************************************************************************************************************************** */

  return (
    <div className="pt-20 max-w-[1480px] mx-auto ">
      {/* Image Carousel Section */}
      <div className="relative h-[500px] w-full overflow-hidden px-2 py-1 mb-0 mx-auto">
        {/* Left Arrow Button */}
        <button
          onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="absolute left-24 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
          className="absolute right-24 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Updated Carousel Container */}
        <div
          className="flex transition-transform duration-1000 h-[95%]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full px-4" // Added px-2 for gap between slides
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-[2rem] shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-green-500' : 'bg-white/50'
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Info Strip */}
      <div className="bg-gradient-to-r from-green-50 to-green-100/20 py-2 mt-1 max-w-[1400px] mx-auto rounded-2xl shadow-sm relative overflow-hidden
        before:absolute before:inset-0 before:border-2 before:border-green-300/50 before:rounded-2xl
        before:animate-[border-dance_4s_linear_infinite]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            
            {/* Products Count */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">150+ Products</p>
                <p className="text-sm text-gray-600">Extensive Collection</p>
              </div>
            </div>

            {/* Authenticity */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">100% Original</p>
                <p className="text-sm text-gray-600">Genuine Products</p>
              </div>
            </div>

            {/* Best Prices */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Best Prices</p>
                <p className="text-sm text-gray-600">Guaranteed Savings</p>
              </div>
            </div>

            {/* Expert Support */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Expert Support</p>
                <p className="text-sm text-gray-600">24/7 Assistance</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* New Welcome Section */}
      <div className="max-w-[1400px] mx-auto mt-16 mb-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Dental Supplies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality dental supplies and equipment. 
            We're committed to supporting dental professionals with the best products in the industry.
          </p>
          
        </div>
      </div>

      {/*Best Seller Section */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-gray-100 mx-4 sm:mx-10 mt-10 mb-10 rounded-3xl p-4 sm:p-10 shadow-lg">
        {/* Header Section with Title and View All Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
            <p className="text-gray-600 text-sm mt-1">Our most popular dental products</p>
          </div>
          <button 
            onClick={() => navigate('/products/best-sellers')}
            className="px-6 py-2 bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
          >
            View All
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Products Carousel */}
        <div className="relative w-full">
          {/* Optional: Add Left-Right Scroll Buttons */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200 -ml-4 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex overflow-x-auto space-x-4 pb-6 pt-4 px-4 scrollbar-hide">
            {bestSellers.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] transform hover:scale-105 transition-transform duration-300">
                <ProductCard
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  mrp={product.mrp}
                />
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200 -mr-4 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>



{/* Featured Categories Grid - Thinner Layout */}
<div className="px-4 py-8">
  <h2 className="text-2xl font-bold mb-6 text-gray-900">Shop By Category</h2>
  
  {/* Main Grid */}
  <div className="grid grid-cols-12 gap-4">
    {/* Large Left Panel - Reduced height from 400px to 300px */}
    <div className="col-span-4 grid gap-4">
      {/* Top Tile - General */}
      <div className="relative group h-[300px] overflow-hidden rounded-2xl">
        <img 
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99" 
          alt="General Dentistry"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-6 left-6 text-white">
            <span className="text-sm font-medium bg-blue-500 px-3 py-1 rounded-full">Most Popular</span>
            <h3 className="text-2xl font-bold mt-2">General Dentistry</h3>
            <p className="text-sm mt-1 mb-3 text-gray-200">Essential equipment & supplies</p>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
            onClick={() => navigate('/products/general-dentistry')}>
              Shop Collection
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tile - Disposables - Reduced height from 200px to 150px */}
      <div className="relative group h-[150px] overflow-hidden rounded-2xl">
        <img 
          src="https://images.unsplash.com/photo-1583947581924-860bda6a26df" 
          alt="Disposables"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-bold">Disposables</h3>
            <p className="text-sm mt-1">Essential daily supplies</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
            onClick={() => navigate('/products/disposables')}>
              Explore →
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Center Stack */}
    <div className="col-span-5 grid gap-4">
      {/* Top Row - Reduced height from 290px to 220px */}
      <div className="grid grid-cols-2 gap-4">
        {/* Equipment */}
        <div className="relative group h-[220px] overflow-hidden rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5" 
            alt="Equipment"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-lg font-bold">Equipment</h3>
              <p className="text-sm mt-1">Modern tech</p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
              onClick={() => navigate('/products/equipment')}>
              Explore →
            </button>
            </div>
          </div>
        </div>
        {/* Restoratives */}
        <div className="relative group h-[220px] overflow-hidden rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe" 
            alt="Restoratives"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-lg font-bold">Restoratives</h3>
              <p className="text-sm mt-1">Quality materials</p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
              onClick={() => navigate('/products/restoratives')}>
              Explore →
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Wide Endodontics - Reduced height from 310px to 230px */}
      <div className="relative group h-[230px] overflow-hidden rounded-2xl">
        <img 
          src={Endodontics}
          alt="Endodontics"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-6 left-6 text-white">
            <span className="text-sm font-medium bg-green-500 px-3 py-1 rounded-full">New Arrivals</span>
            <h3 className="text-2xl font-bold mt-2">Endodontics</h3>
            <p className="text-sm mt-1 mb-3">Specialized tools & materials</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
            onClick={() => navigate('/products/endodontics')}>
              Explore →
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Right Stack */}
    <div className="col-span-3 grid gap-4">
      {/* Instruments - Reduced height from 190px to 150px */}
      <div className="relative group h-[150px] overflow-hidden rounded-2xl">
        <img 
          src="https://images.unsplash.com/photo-1571772996211-2f02c9727629" 
          alt="Instruments"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-lg font-bold">Instruments</h3>
            <p className="text-sm mt-1">Precision tools</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
            onClick={() => navigate('/products/instruments')}>
              Explore →
            </button>
          </div>
        </div>
      </div>

      {/* Sterilization - Reduced height from 410px to 300px */}
      <div className="relative group h-[300px] overflow-hidden rounded-2xl">
        <img 
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95" 
          alt="Sterilization"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-6 left-6 text-white">
            <span className="text-sm font-medium bg-purple-500 px-3 py-1 rounded-full">Featured</span>
            <h3 className="text-xl font-bold mt-2">Sterilization</h3>
            <p className="text-sm mt-1 mb-3">Safety first</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
            onClick={() => navigate('/products/sterilization')}>
              View All →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Products Sections */}
      {categories.map((category) => (
        <div 
          key={category.id} 
          className="flex flex-col gap-4 mx-4 sm:mx-10 mb-10 rounded-3xl"
        >
          <ProductSection
            title={category.name}
            path={category.path}
            products={category.products}
            buttonStyle="View all >>"
          />
          
          {/* Add Carousel after Restoratives category */}
          {category.name === 'Restoratives' && (
            <div className="relative h-[260px] w-[90%] mx-auto overflow-hidden mt-8">
              {/* Left Arrow */}
              <button
                onClick={() => setRestorativeSlide(restorativeSlide === 0 ? restorativeImages.length - 1 : restorativeSlide - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => setRestorativeSlide(restorativeSlide === restorativeImages.length - 1 ? 0 : restorativeSlide + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Carousel Container */}
              <div
                className="flex transition-transform duration-1000 h-full"
                style={{ transform: `translateX(-${restorativeSlide * 100}%)` }}
              >
                {restorativeImages.map((image, index) => (
                  <div
                    key={index}
                    className="min-w-full px-2"
                  >
                    <img
                      src={image}
                      alt={`Restorative Slide ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {restorativeImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === restorativeSlide ? 'bg-green-500' : 'bg-white/50'}`}
                    onClick={() => setRestorativeSlide(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add Poster Section after Instruments category */}
          {category.name === 'Instruments' && (
            <div className="grid grid-cols-2 gap-6 mt-12 mb-12 w-[90%] mx-auto">
              {/* Left Side - Two Posters */}
              <div className="flex flex-col gap-6">
                {/* Top Poster - reduced from h-[200px] to h-[180px] */}
                <div className="relative h-[180px] group overflow-hidden rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80" 
                    alt="Special Offer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
                      <p className="text-sm mb-4">Get 20% off on all instruments</p>
                      <button className="px-4 py-2 bg-white text-black rounded-lg text-sm hover:bg-opacity-90">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Poster - reduced from h-[200px] to h-[180px] */}
                <div className="relative h-[180px] group overflow-hidden rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80" 
                    alt="New Arrivals"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                      <p className="text-sm mb-4">Check out our latest collection</p>
                      <button className="px-4 py-2 bg-white text-black rounded-lg text-sm hover:bg-opacity-90">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Single Tall Poster - reduced from h-[420px] to h-[380px] */}
              <div className="relative h-[380px] group overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80" 
                  alt="Premium Equipment"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">Premium Equipment</h3>
                    <p className="text-lg mb-4">Discover our high-end dental solutions</p>
                    <button className="px-6 py-3 bg-white text-black rounded-lg text-base hover:bg-opacity-90">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;




{/* Featured Categories Grid */}
/*
<div className="container mx-auto px-4 py-8">
<div className="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Categories</div>
<div className="flex flex-row justify-between gap-4 overflow-x-auto">
  {categories.map((category) => (
    <Categories key={category.id} path={category.path} image={category.image} name={category.name} />
  ))}
</div>
</div>

*/
import { useState, useEffect } from 'react';
import ProductCard from './Components/productCard';
import Categories from './Components/Categories';
import AdminPage from './Pages/adminPage';
import ProductSection from './Components/ProductSection'; 

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04', 
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      title: "Smart Watch", 
      description: "Feature-rich smartwatch with health tracking",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      title: "Laptop",
      description: "Powerful laptop for work and gaming",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },
    {
      title: "Smartphone",
      description: "Latest smartphone with amazing camera",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    }
  ];

  return (
    <div className="pt-16 max-w-[1450px] mx-auto"> {/* Added padding-top to account for fixed navbar */}
    {/* <AdminPage/>   */}
      {/* Image Carousel */}
      <div className="relative h-[500px] w-full overflow-hidden px-8 py-8 mx-auto">
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
              className="min-w-full px-8" // Added px-2 for gap between slides
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
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-green-500' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <Categories />  

      {/* Products Sections */}
      <ProductSection 
        title="General Products" 
        path="/products/general"
        bgColor="bg-blue-50"
      />
      <ProductSection 
        title="Restoratives" 
        path="/products/restoratives"
        bgColor="bg-purple-50"
      />
      <ProductSection 
        title="Equipment" 
        path="/products/equipment"
        bgColor="bg-cyan-50"
      />
      <ProductSection 
        title="Instruments" 
        path="/products/instruments"
        bgColor="bg-indigo-50"
      />
      <ProductSection 
        title="Endodontics" 
        path="/products/endodontics"
        bgColor="bg-green-50"
      />
      <ProductSection 
        title="Disposables" 
        path="/products/disposables"
        bgColor="bg-rose-50"
      />
      <ProductSection 
        title="Sterilization" 
        path="/products/sterilization"
        bgColor="bg-sky-50"
      />
    </div>
  );
};

export default Home;

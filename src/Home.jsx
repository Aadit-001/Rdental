import { useState, useEffect } from 'react';
import ProductCard from './Components/productCard';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'data:image/jpeg;base64,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',
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
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      title: "Boat Earbuds",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      title: "Smarttt watch", 
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
    <div className="pt-16"> {/* Added padding-top to account for fixed navbar */}
      {/* Image Carousel */}
      <div className="relative h-[500px] w-full overflow-hidden px-8 py-8 ">
        {/* Left Arrow Button */}
        <button 
          onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="absolute left-16 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button 
          onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
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
              className="min-w-full px-2" // Added px-2 for gap between slides
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

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

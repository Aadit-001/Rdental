import { useState, useEffect } from 'react';
import Categories from './Components/Categories';
import ProductSection from './Components/ProductSection';
import ProductCard from './Components/ProductCard';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  //ye bhi database se uthana hoga ******************************************************************************************************************
  const slides = [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80', // Dental office
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80', // Dental equipment
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80', // Dental tools
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80', // Dental chair
    'https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80', // Replacing broken dental hygiene image
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80'  // Dental examination
  ];
  //**************************************************************************************************************************************************** */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 3,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 4,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 5,
          title: "Boat Earbudssssss",
          description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
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
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 3,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 4,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 5,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 6,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 7,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 8,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }
  ]
  //**************************************************************************************************************************************************** */

  return (
    <div className="pt-20 max-w-[1480px] mx-auto"> {/* Added padding-top to account for fixed navbar */}
      {/* Image Carousel */}
      <div className="relative h-[500px] w-full overflow-hidden px-2 py-2 mx-auto ">
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


      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Categories</div>
        <div className="flex flex-row justify-between gap-4 overflow-x-auto">
          {categories.map((category) => (
            <Categories key={category.id} path={category.path} image={category.image} name={category.name} />
          ))}
        </div>
      </div>

      {/*Best Seller Section */}
      <div className="flex flex-col gap-4 bg-gray-100 ml-10 mb-10 mr-10 mt-10 rounded-3xl p-10">
        <div className="text-3xl font-bold mb-6 text-gray-900">Best Sellers</div>
        <div className="flex overflow-x-auto space-x-8 pb-4 pt-6 scrollbar-hide">
              {bestSellers.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[250px]">
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

      {/* Products Sections */}
      <div className="flex flex-col gap-4 bg-green-100 ml-10 mb-10 mr-10 rounded-3xl">
        {
          categories.map((category) => (
            <ProductSection
              key={category.id}
              title={category.name}
              path={category.path}
              products={category.products}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Home;
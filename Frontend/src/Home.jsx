import { useState, useEffect } from 'react';
import ProductSection from './Components/productSection';
import ProductCard from './Components/productCard';
import { useNavigate } from 'react-router-dom';
import myContext from './context/data/myContext';
import { useContext } from 'react';
import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';
import slide4 from './assets/slide4.jpg';
import slide5 from './assets/slide5.jpg';
import DisposablesHome from './assets/DisposablesHome.jpg';
import EndodonticsHome from './assets/EndodonticsHome.jpg';
import EquipmentHome from './assets/EquipmentHome.jpg';
import GeneralHome from './assets/GeneralHome.jpg';
import InstrumentHome from './assets/InstrumentHome.jpg';
import RestorativeHome from './assets/RestorativeHome.jpg';
import SterilizationHome from './assets/SterilizationHome.jpg';



const Home = () => {
  const {categories,bestSellers} = useContext(myContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [restorativeSlide, setRestorativeSlide] = useState(0);
  const navigate = useNavigate();


  //ye bhi database se uthana hoga ******************************************************************************************************************
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  ];
  //**************************************************************************************************************************************************** */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []); // Added dependency array


  return (
    <div className="pt-20 max-w-[1480px] w-screen mx-auto ">
      {/* Image Carousel Section */}
      <div className="relative h-[200px] lg:h-[500px] w-full overflow-hidden py-1 mb-0 mx-auto">
        {/* Left Arrow Button */}
        <button
          onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="absolute left-24 hidden sm:block top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
          className="absolute hidden sm:block right-24 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Updated Carousel Container */}
        <div
          className="flex transition-transform duration-1000 h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full px-4"
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className={`w-full h-full ${
                  index < 3 ? "object-cover" : "object-stretch"
                } rounded-[0.5rem] sm:rounded-[1rem] lg:rounded-[2rem] shadow-lg 
                sm:transform-none transform scale-[1.02]
                object-center`}
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-2 lg:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
      <div className="bg-gradient-to-r from-green-50 to-green-100/20 py-2 mt-8  max-w-[1400px] mx-auto rounded-xl shadow-sm relative overflow-hidden
        before:absolute before:inset-0 before:border-2 before:border-green-300/50 before:rounded-xl
        before:animate-[border-dance_4s_linear_infinite]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4 md:grid-cols-4">

            {/* Products Count */}
            <div className="flex items-center justify-center gap-3 group hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-lg group-hover:rotate-12 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 animate-[pulse_2s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className='hidden sm:block'>
                <p className="text-lg font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">150+ Products</p>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform">Extensive Collection</p>
              </div>
            </div>

            {/* Authenticity */}
            <div className="flex items-center justify-center gap-3 group hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-lg group-hover:rotate-12 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 animate-[bounce_1.5s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className='hidden sm:block'>
                <p className="text-lg font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">100% Original</p>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform">Genuine Products</p>
              </div>
            </div>

            {/* Best Prices */}
            <div className="flex items-center justify-center gap-3 group hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-lg group-hover:rotate-12 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 animate-[spin_3s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className='hidden sm:block'>
                <p className="text-lg font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">Best Prices</p>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform">Guaranteed Savings</p>
              </div>
            </div>

            {/* Expert Support */}
            <div className="flex items-center justify-center gap-3 group hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-lg group-hover:rotate-12 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className='hidden sm:block'>
                <p className="text-lg font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">Expert Support</p>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform">24/7 Assistance</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* New Welcome Section */}
      <div className="max-w-[1400px] mx-auto mt-8 sm:mt-16 mb-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to <p><span className="text-green-500">R</span>-DENTAL Supplies</p></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto hidden sm:block">
            Discover our comprehensive range of high-quality dental supplies and equipment.
            We&apos;re committed to supporting dental professionals with the best products in the industry.
          </p>

        </div>
      </div>
      {/*Best Seller Section */}
      <div className="flex flex-col gap-2 bg-gradient-to-br from-blue-50 via-white to-blue-50 max-w-[1400px] mx-auto mt-10 mb-10 lg:rounded-3xl p-4 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-90 relative overflow-hidden before:absolute before:inset-0 before:bg-blue-200/20 before:animate-pulse">
        {/* Header Section with Title and View All Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-teal-500 animate-gradient-x drop-shadow-lg tracking-wide ">
                Best Sellers
              </h2>
              <span className="hidden sm:inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                Top Picks
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-2 font-medium">Our most popular dental products</p>
          </div>
          {/* <button
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
          </button> */}
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Optional: Add Left-Right Scroll Buttons */}
          {/* <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200 -ml-4 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button> */}

          <div className="flex items-center overflow-x-auto space-x-[3px] md:space-x-[2%] pb-6 pt-6 pl-0 lg:pl-4 scrollbar-hide 
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
                        before:absolute before:left-0 before:w-8 before:h-full before:bg-gradient-to-r before:from-white/50 before:to-transparent before:z-10
                        after:absolute after:right-0 after:w-8 after:h-full after:bg-gradient-to-l after:from-white/50 after:to-transparent after:z-10">
            {bestSellers.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-[240px] flex items-center justify-center transform hover:scale-105 transition-transform duration-300 hover:z-10"
              >
                <div className="w-full p-2 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <ProductCard
                    title={product.title}
                    description={product.description}
                    price={Number(product.price) || 0}
                    rating={Number(product.rating) || 0}
                    catagory={product.category}
                    quantitySold={Number(product.quantitySold) || 0}
                    inStock={product.inStock}
                    totalStock={Number(product.totalStock) || 0}
                    noOfRatings={Number(product.noOfRatings) || 0}
                    image={product.imageUrl}
                    mrp={Number(product.mrp) || 0}
                    id={product.id}
                    noOfReviews={Number(product.noOfReviews) || 0}
                    reviews={product.reviews || []}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200 -mr-4 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button> */}
        </div>
      </div>



      {/* Featured Categories Grid - Thinner Layout */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-900 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
            Shop By Category
          </span>
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
        </h2>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-1 md:gap-4">
          {/* Large Left Panel - Reduced height from 400px to 300px */}
          <div className="col-span-4 grid gap-1 md:gap-4">
            {/* Top Tile - General */}
            <div className="relative group h-[80px] md:h-[300px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
            onClick={() => { navigate('/products/general'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img
                src={GeneralHome}
                alt="General Dentistry"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute md:flex md:flex-col md:justify-start md:items-start inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-6  left-6 text-white">
                  <span className="text-sm font-medium bg-blue-500 px-3 py-1 rounded-full hidden sm:block">Most Popular</span>
                  <div className="text-sm md:text-2xl font-bold mt-2 absolute -top-6  md:relative md:top-0 ">General Dentistry</div>
                  <p className="text-sm mt-1 mb-3 text-gray-200 hidden sm:block">Essential equipment & supplies</p>
                  <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                    onClick={() => { navigate('/products/general'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Shop Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Tile - Disposables - Reduced height from 200px to 150px */}
            <div className="relative group h-[80px] md:h-[150px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
            onClick={() => { navigate('/products/disposables'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img
                src={DisposablesHome}
                alt="Disposables"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"

              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-sm md:text-lg  md:font-bold absolute -top-1  md:relative md:top-0 ">Disposables</h3>
                  <p className="text-sm mt-1 hidden sm:block">Essential daily supplies</p>
                  <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                    onClick={() => { navigate('/products/disposables'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Stack */}
          <div className="col-span-5 grid gap-1 md:gap-4">
            {/* Top Row - Reduced height from 290px to 220px */}
            <div className="grid grid-cols-2 gap-1 md:gap-4">
              {/* Equipment */}
              <div className="relative group h-[80px] md:h-[220px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
              onClick={() => { navigate('/products/equipment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <img
                  src={EquipmentHome}
                  alt="Equipment"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"

                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">

                  <div className="absolute bottom-6 left-1 md:left-6 text-white">
                    <h3 className="text-sm md:text-lg  absolute -top-1  md:relative md:top-0 ">Equipment</h3>
                    <p className="text-sm mt-1 hidden sm:block">Modern tech</p>
                    <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                      onClick={() => { navigate('/products/equipment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
              {/* Restoratives */}
              <div className="relative group h-[80px] md:h-[220px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
              onClick={() => { navigate('/products/restoratives'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <img
                  src={RestorativeHome}
                  alt="Restoratives"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"

                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-6 left-0 md:left-6 text-white">
                    <h3 className="text-sm md:text-lg  md:font-bold absolute -top-1  md:relative md:top-0 ">Restoratives</h3>
                    <p className="text-sm mt-1 hidden sm:block">Quality materials</p>
                    <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                      onClick={() => { navigate('/products/restoratives'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Shop Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom - Wide Endodontics - Reduced height from 310px to 230px */}
            <div className="relative group h-[80px] md:h-[230px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
            onClick={() => { navigate('/products/endodontics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img
                src={EndodonticsHome}
                alt="Endodontics"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"

              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute md:flex md:flex-col md:justify-start  md:items-start bottom-6 left-6 text-white">
                  <span className="text-sm font-medium hidden sm:block bg-green-500 px-3 py-1 rounded-full">New Arrivals</span>
                  <h3 className="text-lg md:text-lg font-bold mt-2 absolute -top-4  md:relative md:top-0 ">Endodontics</h3>
                  <p className="text-sm mt-1 mb-3 hidden sm:block">Specialized tools & materials</p>
                  <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => { navigate('/products/endodontics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Shop Collection
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stack */}
          <div className="col-span-3 grid gap-1 md:gap-4">
            {/* Instruments - Reduced height from 190px to 150px */}
            <div className="relative group h-[80px] md:h-[150px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
            onClick={() => { navigate('/products/instruments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img
                src={InstrumentHome}
                alt="Instruments"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"

              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-6 left-2 md:left-6 text-white">
                  <h3 className="text-sm md:text-lg  md:font-bold absolute -top-1  md:relative md:top-0 ">Instruments</h3>
                  <p className="text-sm mt-1 hidden sm:block">Precision tools</p>
                  <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                    onClick={() => { navigate('/products/instruments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Explore →
                  </button>
                </div>
              </div>
            </div>

            {/* Sterilization - Reduced height from 410px to 300px */}
            <div className="relative group h-[80px] md:h-[300px] overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
            onClick={() => { navigate('/products/sterilization'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img
                src={SterilizationHome}
                alt="Sterilization"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute md:flex md:flex-col md:justify-start  md:items-start bottom-6 left-2 md:left-6 text-white">
                  <span className="text-sm hidden sm:block  font-medium bg-purple-500 px-3 py-1 rounded-2xl">Featured</span>
                  <h3 className="text-sm md:text-lg  absolute -top-1  md:relative md:top-0 ">Sterilization</h3>
                  <p className="text-sm mt-1 hidden sm:block">Safety first</p>
                  <button className="bg-white/20 hidden sm:block hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => { navigate('/products/sterilization'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Shop Collection
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
          className="flex flex-col gap-4 mx-0 lg:mx-4 sm:mx-10 mb-10 rounded-3xl"
        >
          <ProductSection
            title={category.name}
            // path={category.path}
            // products={category.products}
            buttonStyle="View all >>"
          />


          {/* Add Poster Section after Instruments category */}
          {category.name === 'Instruments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-12 mb-12 w-[90%] mx-auto">
              {/* Left Side - Two Posters */}
              <div className="flex flex-col gap-3">
                {/* Top Poster - Precision Instruments */}
                <div className="relative h-[180px] bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-cyan-50/50 z-10"></div>
                  <div className="relative z-20 p-6 text-gray-800 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-cyan-800 transform group-hover:translate-x-2 transition-transform">
                        Precision Instruments
                      </h3>
                      <p className="text-xs md:text-sm text-cyan-700 opacity-80 transform group-hover:translate-x-1 transition-transform">
                        Advanced Surgical Tools
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">
                        Quality Guaranteed
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-cyan-600 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Poster - Modern Equipment */}
                <div className="relative h-[180px] bg-white border-2 border-teal-100 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-teal-50/50 z-10"></div>
                  <div className="relative z-20 p-6 text-gray-800 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-teal-800 transform group-hover:translate-x-2 transition-transform">
                        Modern Equipment
                      </h3>
                      <p className="text-xs md:text-sm text-teal-700 opacity-80 transform group-hover:translate-x-1 transition-transform">
                        Advanced Dental Technology
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                        Latest Innovation
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-teal-600 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Comprehensive Solutions */}
              <div className="relative h-auto md:h-[370px] bg-white border-2 border-indigo-100 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-indigo-50/50 z-10"></div>
                <div className="relative z-20 p-6 md:p-8 text-gray-800 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-indigo-800 transform group-hover:translate-x-2 transition-transform">
                      Complete Dental Solutions
                    </h3>
                    <p className="text-sm md:text-lg text-indigo-700 opacity-80 transform group-hover:translate-x-1 transition-transform">
                      Professional Equipment & Support
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 md:space-y-3 mt-3 md:mt-0">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-6 w-4 md:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs md:text-sm">Comprehensive Range</span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-6 w-4 md:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs md:text-sm">Competitive Pricing</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      Professional Grade
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-indigo-600 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 01-4.176-3.97L9.99 7.51a2 2 0 00-1.522-1.39L5.268 5.235a2 2 0 00-2.4 1.595l-.546 2.916a28.058 28.058 0 00.199 11.154A19.882 19.882 0 007.5 19.5a20.07 20.07 0 005.814 2.707 19.821 19.821 0 006.358.419 20.065 20.065 0 005.733-1.874 19.834 19.834 0 004.545-3.222 20.08 20.08 0 003.138-4.229 19.906 19.906 0 001.334-4.644l.667-3.577a2 2 0 00-1.874-2.33l-2.298-.135a2 2 0 00-1.911 1.59l-.505 2.535a6 6 0 01-3.495 4.471z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Contact CTA Section */}
      <div className="max-w-[1400px] mx-auto px-4 py-16 text-left ml-54">
        <h2 className="text-5xl font-inconsolata text-blue-900/90 mb-3">
          Didn&apos;t find what you were looking for?
        </h2>
        <p className="text-lg text-black-900 mb-8">Let us know</p>
        <button
          onClick={() => {
            navigate('/contactUs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 font-medium rounded-2xl 
                    hover:bg-green-500 hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Home;

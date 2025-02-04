import { useState, useEffect } from 'react';
import ProductSection from './Components/productSection';
import ProductCard from './Components/productCard';
import { useNavigate } from 'react-router-dom';
import Endodontics from './assets/Endodentics.jpg';
import myContext from './context/data/myContext';
import { useContext } from 'react';


const Home = () => {
  const {categories,bestSellers} = useContext(myContext);
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
    }, 2000);

    return () => clearInterval(timer);
  }, []); // Added dependency array

  useEffect(() => {
    const timer = setInterval(() => {
      setRestorativeSlide((prevSlide) =>
        prevSlide === restorativeImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 1500);

    return () => clearInterval(timer);
  }, []);

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
            <div className="flex items-center justify-center gap-3 group hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-lg group-hover:rotate-12 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 animate-[pulse_2s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
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
              <div>
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
              <div>
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
              <div>
                <p className="text-lg font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">Expert Support</p>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform">24/7 Assistance</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* New Welcome Section */}
      <div className="max-w-[1400px] mx-auto mt-16 mb-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to <span className="text-green-500">R</span>-DENTAL Supplies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality dental supplies and equipment.
            We&apos;re committed to supporting dental professionals with the best products in the industry.
          </p>

        </div>
      </div>

      {/*Best Seller Section */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-blue-50 to-blue-10 max-w-[1400px] mx-auto mt-10 mb-10 rounded-3xl p-4 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-90 relative overflow-hidden before:absolute before:inset-0 before:bg-blue-200/20 before:animate-pulse">
        {/* Header Section with Title and View All Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-teal-500 animate-gradient-x drop-shadow-lg tracking-wide  animate-pulse">Best Sellers</h2>
            <p className="text-black-900 text-sm mt-1">Our most popular dental products</p>
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

          <div className="flex justify-center items-center overflow-x-auto space-x-[3px]  pb-6 pt-6 pl-4 scrollbar-hide">
            {bestSellers.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[240px] flex items-center justify-center transform hover:scale-10 transition-transform duration-300">
                <ProductCard
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  catagory={product.category}
                  quantitySold={product.quantitySold}
                  inStock={product.inStock}
                  totalStock={product.totalStock}
                  noOfRatings={product.noOfRatings}
                  image={product.imageUrl}
                  mrp={product.mrp}
                  id={product.id}
                  noOfReviews={product.noOfReviews}
                  reviews={product.reviews}
                />
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500 animate-pulse">
            Shop By Category
          </span>
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
        </h2>

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
                    onClick={() => { navigate('/products/general'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                    onClick={() => { navigate('/products/disposables'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                      onClick={() => { navigate('/products/equipment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                    <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors mt-2"
                      onClick={() => { navigate('/products/restoratives'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Shop Collection
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
                  <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                    onClick={() => { navigate('/products/endodontics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Shop Collection
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
                    onClick={() => { navigate('/products/instruments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                  <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
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
          className="flex flex-col gap-4 mx-4 sm:mx-10 mb-10 rounded-3xl"
        >
          <ProductSection
            title={category.name}
            // path={category.path}
            // products={category.products}
            buttonStyle="View all >>"
          />

          {/* Add Carousel after Restoratives category */}
          {category.name === 'Restoratives' && (
            <>
              <div className="relative h-[260px] w-[90%] mx-auto overflow-hidden mt-8 mb-5">
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
                        className="w-full h-full object-cover rounded-[2rem]"
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

              {/* Updated Info Strip */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-2 mt-8 w-[90%] mx-auto rounded-2xl shadow-sm relative overflow-hidden
        before:absolute before:inset-0 before:border-2 before:border-blue-300/30 before:rounded-2xl
        before:animate-[border-dance_4s_linear_infinite] ">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    
                    {/* Fast Shipping */}
                    <div className="flex items-center justify-center gap-3 group">
                      <div className="p-2 bg-white rounded-full shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="transition-all duration-300 group-hover:translate-x-2">
                        <p className="text-base font-semibold text-gray-900">Fast Shipping</p>
                        <p className="text-xs text-gray-600">Quick Delivery</p>
                      </div>
                    </div>

                    {/* Price Match */}
                    <div className="flex items-center justify-center gap-3 group">
                      <div className="p-2 bg-white rounded-full shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="transition-all duration-300 group-hover:translate-x-2">
                        <p className="text-base font-semibold text-gray-900">Price Match</p>
                        <p className="text-xs text-gray-600">Guaranteed Best Rates</p>
                      </div>
                    </div>

                    {/* Bulk Orders */}
                    <div className="flex items-center justify-center gap-3 group">
                      <div className="p-2 bg-white rounded-full shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="transition-all duration-300 group-hover:translate-x-2">
                        <p className="text-base font-semibold text-gray-900">Bulk Orders</p>
                        <p className="text-xs text-gray-600">Special Discounts</p>
                      </div>
                    </div>

                    {/* Practice Setup */}
                    <div className="flex items-center justify-center gap-3 group">
                      <div className="p-2 bg-white rounded-full shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="transition-all duration-300 group-hover:translate-x-2">
                        <p className="text-base font-semibold text-gray-900">Practice Setup</p>
                        <p className="text-xs text-gray-600">Complete Solutions</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </>
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




{/* Featured Categories Grid */ }
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
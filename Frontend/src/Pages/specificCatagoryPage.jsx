import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import RelatedProductCard from '../Components/RelatedProductCard';
import endodentics from '../assets/Endodentics.jpg';
import equipments from '../assets/equipments.jpg';
import restoratives from '../assets/restoratives.png';
import instruments from '../assets/instruments.jpg';
import sterilization from '../assets/sterilization.webp';
import GeneralDentistry from '../assets/GeneralDentistry.jpg';
import {useContext} from 'react';
import myContext from '../context/data/myContext';

const SpecificCategoryPage = () => {
  const { getCategoryProducts } = useContext(myContext);

  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Add this useEffect for scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]); // Scroll to top whenever category changes

  // Get poster image based on category
  const getPosterImage = useCallback(() => {
    switch(category.toLowerCase()) {
      case 'endodentics':
        return endodentics;
      case 'equipment':
        return equipments;
      case 'restoratives':
        return restoratives;
      case 'instruments':
        return instruments;
      case 'sterilization':
        return sterilization;
      case 'general':
        return GeneralDentistry;
      default:
        return endodentics; // Default fallback image
    }
  }, [category]);

  // Memoized product fetching
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        // Use the context method to get category products
        const response = await getCategoryProducts(category);
        
        if (isMounted) {
          // Only update if products have changed
          if (JSON.stringify(response) !== JSON.stringify(products)) {
            setProducts(response);
            setFilteredProducts(response);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category, getCategoryProducts]);

  // Memoized filtering logic
  const processedProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption) {
      filtered.sort((a, b) => {
        switch (sortOption) {
          case 'Newest First':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'Price: Low to High':
            return a.price - b.price;
          case 'Price: High to Low':
            return b.price - a.price;
          case 'Most Popular':
            return b.quantitySold - a.quantitySold;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, searchQuery, sortOption]);

  // Update filtered products when processed products change
  useEffect(() => {
    setFilteredProducts(processedProducts);
  }, [processedProducts]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Banner/Poster */}
        <div className="relative h-[100px] md:h-[300px] mb-2 md:mb-12 rounded-xl overflow-hidden">
          <img
            src={getPosterImage()}
            alt={`${category} category`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-black/40 flex items-end justify-end">
            <h1 className="text-5xl font-bold text-white capitalize p-8">
              {category.replace(/-/g, ' ')}
            </h1>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col md:flex-row md:gap-8 md:pb-12">
          {/* Left Sidebar - 20% */}
          <div className="w-full md:w-1/5  top-16 md:top-24">
            {/* Search Bar */}
            <div className="relative bg-white p-4 rounded-lg shadow-lg mb-2 md:mb-6 transform transition duration-500 border-2 border-green-100 hover:border-green-500 backdrop-blur-sm bg-white/90">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
                className="w-full px-4 py-2 bg-transparent outline-none border-b-2 border-green-500 focus:border-green-600"
              />
            </div>

            {/* Sort Options */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4 md:mb-6 transform transition duration-500 border-2 border-green-100 hover:border-green-500 backdrop-blur-sm bg-white/90">
              <div className="flex justify-between items-center mb-1 md:mb-4">
                <h3 className="font-bold text-lg text-green-600 border-b-2 border-green-200 pb-0 md:pb-2">Sort By</h3>
                <button 
                  onClick={() => {
                    // Get all radio buttons
                    const radioButtons = document.getElementsByName('sort');
                    // Uncheck all radio buttons
                    radioButtons.forEach(radio => {
                      radio.checked = false;
                    });
                    // eslint-disable-next-line no-undef
                    setIsSorting(false);
                  }}
                  className="text-sm px-2 py-1 text-green-600 hover:text-white border border-green-500 hover:bg-green-500 rounded transition-colors duration-300"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-0 md:space-y-2">
                {['Newest First', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                  <label 
                    key={option} 
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-all duration-300 hover:bg-green-50 group relative overflow-hidden"
                  >
                    <input 
                      type="radio" 
                      name="sort"

                      value={option}
                      onChange={(e) => setSortOption(e.target.value)}

                      className="text-green-500 focus:ring-green-500 relative z-10"
                    />
                    <span className={`
                      text-gray-700 transition-colors duration-300 font-medium relative z-10
                      group-hover:text-green-600
                      [input:checked+&]:text-green-700
                      [input:checked+&]:rounded-md
                    `}>
                      {option}
                    </span>
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-green-50 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      [input:checked~&]:opacity-100
                      [input:checked~&]:bg-gradient-to-r 
                      [input:checked~&]:from-green-200/50
                      [input:checked~&]:to-transparent
                    `}/>
                  </label>
                ))}
              </div>
            </div>

            {/* Mini Category Banner */}
            <div className="relative hidden sm:block h-[600px] rounded-lg overflow-hidden bg-white border-2 border-purple-100 shadow-md group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-purple-50/50 z-10"></div>
              <div className="relative z-20 p-8 text-gray-800 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-bold mb-4 text-purple-800 transform group-hover:translate-x-2 transition-transform">
                    Special Offers
                  </h3>
                  <p className="text-lg text-purple-700 opacity-80 transform group-hover:translate-x-1 transition-transform">
                    Exclusive Deals on Dental Products
                  </p>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Limited Time Offers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Up to 20% Off</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-semibold bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    Shop Now
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 80% */}
          <div className="w-full md:w-4/5 relative">
            {/* Products Grid - Fixed heights for different screen sizes */}
            <div className="h-[calc(120vh)] overflow-y-auto">
              {/* Products Count */}
              <div className="mb-6 flex justify-between items-center h-14 bg-slate-50 py-4 px-6 rounded-lg shadow-lg hover:shadow-xl border-2 border-green-400 transform  transition-all duration-300 animate-fadeIn">
                <h2 className="text-[clamp(1rem,2vw,1.25rem)] ml-[-10px] py-0 font-bold text-emerald-600 drop-shadow-[0_8px_8px_rgba(0,0,0,0.2)] tracking-wider bg-gradient-to-r from-emerald-200/70 to-transparent p-2 rounded-lg animate-pulse transition-all duration-300">
                  {category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Products
                </h2>
                <span className="text-gray-600">
                  Showing {filteredProducts.length} products
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 pb-12">
                {filteredProducts.map((product) => (
                  <RelatedProductCard
                    key={product.id}
                    image={product.imageUrl}
                    catagory={product.category}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    quantitySold={product.quantitySold}
                    inStock={product.inStock}
                    totalStock={product.totalStock}
                    noOfRatings={product.noOfRatings}
                    mrp={product.mrp}
                    id={product.id}
                    noOfReviews={product.noOfReviews}
                    reviews={product.reviews}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCategoryPage;

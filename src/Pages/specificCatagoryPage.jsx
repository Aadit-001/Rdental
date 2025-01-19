import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import endodentics from '../assets/Endodentics.jpg';
import equipment from '../assets/equipments.jpg';
import restoratives from '../assets/restoratives.jpg';
import instruments from '../assets/instruments.webp';
import sterilization from '../assets/sterilization.webp';
import general from '../assets/general.jpg';
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
  const getPosterImage = () => {
    switch(category.toLowerCase()) {
      case 'endodentics':
        return endodentics;
      case 'equipment':
        return equipment;
      case 'restoratives':
        return restoratives;
      case 'instruments':
        return instruments;
      case 'sterilization':
        return sterilization;
      case 'general dentistry':
        return general;
      default:
        return endodentics; // Default fallback image
    }
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getCategoryProducts(category);
        setProducts(response);
        setFilteredProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [getCategoryProducts, category]);


  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter(product => {
        const productName = product.title.toLowerCase();
        const searchQueryLowerCase = searchQuery.toLowerCase();

        return productName.includes(searchQueryLowerCase);
      });

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, products]);

  useEffect(() => {
    const sortProducts = () => {
      if (sortOption === '') {
        setFilteredProducts(products);
      } else {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
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

        setFilteredProducts(sortedProducts);
      }
    };

    sortProducts();
  }, [sortOption, products, filteredProducts]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Banner/Poster */}
        <div className="relative h-[300px] mb-12 rounded-xl overflow-hidden">
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
        <div className="flex gap-8 pb-12">
          {/* Left Sidebar - 20% */}
          <div className="w-1/5 sticky top-24">
            {/* Search Bar */}
            <div className="relative bg-white p-4 rounded-lg shadow-lg mb-6 transform transition duration-500 border-2 border-green-100 hover:border-green-500 backdrop-blur-sm bg-white/90">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
                className="w-full px-4 py-2 bg-transparent outline-none border-b-2 border-green-500 focus:border-green-600"
              />
            </div>

            {/* Sort Options */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6 transform transition duration-500 border-2 border-green-100 hover:border-green-500 backdrop-blur-sm bg-white/90">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-green-600 border-b-2 border-green-200 pb-2">Sort By</h3>
                <button 
                  onClick={() => {
                    // Get all radio buttons
                    const radioButtons = document.getElementsByName('sort');
                    // Uncheck all radio buttons
                    radioButtons.forEach(radio => {
                      radio.checked = false;
                    });
                    setIsSorting(false);
                  }}
                  className="text-sm px-2 py-1 text-green-600 hover:text-white border border-green-500 hover:bg-green-500 rounded transition-colors duration-300"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-2">
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
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <img
                src={getPosterImage()}
                alt="Category promotion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 flex items-end ">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg">Special Offer</h3>
                  <p className="text-sm">Up to 20% off on selected items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 80% */}
          <div className="w-4/5">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 pb-12">

                {filteredProducts.map((product) => (
                {
                  isSorting ? (
                    filteredProducts.map((product) => (
                      <ProductCard
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
                    ))
                  ) : (
                    products.map((product) => (
                      <ProductCard
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
                    ))
                  ) 
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCategoryPage;

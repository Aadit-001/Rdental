import { Link } from 'react-router-dom';
import ProductCard from './productCard';
import { useContext, useRef, useState, useEffect } from 'react';
import myContext from '../context/data/myContext';
import PropTypes from 'prop-types';

const ProductSection = ({ title = 'general' }) => {
    const scrollContainerRef = useRef(null);
    const { getCategoryProducts } = useContext(myContext);
    const products = getCategoryProducts(title) || [];
    let path = "/products/" + (title || 'general');
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (container) {
            // Show left button if we're not at the start
            setShowLeftButton(container.scrollLeft > 0);
            // Show right button if there's more content to scroll
            setShowRightButton(
                container.scrollLeft < (container.scrollWidth - container.clientWidth - 10)
            );
        }
    };
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            // Initial check
            checkScrollButtons();
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollButtons);
            }
        };
    }, []);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const cardWidth = 250; // Width of each product card
            const gap = 16; // Approximate gap between cards
            const scrollAmount = (cardWidth + gap) * 2; // Scroll 2 cards at a time
            const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };


    return (
        <div className="max-w-[1350px] w-screen mx-auto py-8 px-4 ">
            <div className="flex justify-between items-center mb-0 lg:mb-4 bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border-l-4 border-green-500 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
                        {title}
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-500/50 to-transparent rounded-full"></span>
                    </h2>
                    <div className="hidden md:flex items-center gap-2 ml-4">
                        <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full font-medium">
                            {products.length} Products
                        </span>
                    </div>
                </div>
                
                <Link 
                    to={path} 
                    className="group flex items-center gap-0 px-4 py-2 rounded-lg transition-all duration-300"
                >
                    <span className="text-green-700 font-semibold">View all</span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                         <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 5l7 7-7 7M13 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>

              <div className="relative group">
                {/* Left scroll button */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-green-100 hover:scale-110 ${
                        showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                   </svg>
                </button>
                {/* Products container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto pb-6 pt-6 lg:pl-4   scrollbar-hide scroll-smooth gap-0 md:gap-4"
                >
                    {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-[250px] hover:scale-105 transition-all duration-300">
                            <ProductCard
                                title={product.title}
                                description={product.description}
                                price={Number(product.price)}
                                rating={product.rating}
                                catagory={product.category}
                                quantitySold={product.quantitySold}
                                inStock={product.inStock}
                                totalStock={product.totalStock}
                                noOfRatings={product.noOfRatings}
                                image={product.imageUrl}
                                mrp={Number(product.mrp)}
                                id={product.id}
                                noOfReviews={product.noOfReviews}
                                reviews={product.reviews}
                            />
                        </div>
                    ))}
                </div>
                {/* Right scroll button */}
                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-green-100 hover:scale-110 ${
                        showRightButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

ProductSection.propTypes = {
    title: PropTypes.string
};

export default ProductSection;

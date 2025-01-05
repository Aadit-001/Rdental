import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// eslint-disable-next-line react/prop-types
const ProductSection = ({ title, path, products }) => {

    return (
        <div className="max-w-[1350px] mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border-l-4 border-green-500 transition-all duration-300 w-[98%] mx-auto">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
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

            <div className="flex overflow-x-auto space-x-4 pb-6 pt-6 pl-4 scrollbar-hide">
                {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-[250px] hover:scale-104 ">
                        <ProductCard
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                            catagory={title}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
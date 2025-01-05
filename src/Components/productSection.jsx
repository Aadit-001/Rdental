import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// eslint-disable-next-line react/prop-types
const ProductSection = ({ title, path, products }) => {

    // const product = useState(products);

    return (
        <div className="max-w-[1350px] mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {title}
                </h2>
                <Link 
                    to={path} 
                    className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 text-lg transition-all duration-300 hover:gap-3"
                >
                    View all 
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M13 17l5-5-5-5"/>
                        <path d="M6 17l5-5-5-5"/>
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
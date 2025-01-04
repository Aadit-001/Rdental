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
                    className="group flex items-center justify-center w-10 h-10 hover:bg-green-50 rounded-full transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 transform transition-transform group-hover:translate-x-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </Link>
            </div>

            <div className="flex overflow-x-auto space-x-8 pb-4 pt-6 scrollbar-hide">
                {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-[250px]">
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
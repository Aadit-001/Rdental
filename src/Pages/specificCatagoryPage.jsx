import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const SpecificCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated product data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts([
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
        }
        // Add more sample products
      ]);
      setLoading(false);
    }, 1000);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
            {category.replace(/-/g, ' ')}
          </h1>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select className="rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
            
            <select className="rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500">
              <option>Filter by</option>
              <option>In Stock</option>
              <option>On Sale</option>
            </select>
          </div>

          <div className="text-gray-600">
            Showing {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              category={category}
            />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              No products found in this category
            </h3>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SpecificCategoryPage;

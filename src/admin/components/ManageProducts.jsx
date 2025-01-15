import { useState, useContext } from 'react';
import myContext from '../../context/data/myContext';

const ManageProducts = () => {
    const { products, deleteProduct ,categories} = useContext(myContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    };

    const filteredProducts = products?.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-16rem)]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="w-full md:w-48">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Categories</option>
                        {
                            categories?.map((category) => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                {filteredProducts?.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg w-56 h-96">
                        <div className="relative h-48">
                            <img 
                                src={product.imageUrl} 
                                alt={product.title} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
                            <div className="space-y-1">
                                <p className="text-gray-800">
                                    <span className="font-medium">Price:</span>{' '}
                                    <span className="text-green-600 font-semibold">₹{product.price}</span>
                                </p>
                                <p className="text-gray-800">
                                    <span className="font-medium">Category:</span>{' '}
                                    <span className="text-blue-600">{product.category}</span>
                                </p>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => navigate(`/adminPage/edit-product/${product.id}`)}
                                    className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found</p>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;

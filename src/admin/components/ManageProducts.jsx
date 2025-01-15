import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import EditProductModal from './EditProductModal';

const ManageProducts = () => {
    const { products, deleteProduct, updateProduct, categories } = useContext(myContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditing(true);
    };

    const handleUpdate = async (updatedProduct) => {
        await updateProduct(updatedProduct.id, updatedProduct);
        setIsEditing(false);
        setEditingProduct(null);
    };

    const filteredProducts = products?.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                        {categories?.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
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
                                <div className="flex items-center">
                                    <span className="font-medium mr-2">Rating:</span>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className={`w-4 h-4 ${
                                                    index < Math.floor(product.rating || 0)
                                                        ? 'text-yellow-400'
                                                        : index < (product.rating || 0)
                                                        ? 'text-yellow-200'
                                                        : 'text-gray-300'
                                                }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="ml-1 text-sm text-gray-600">
                                            {product.rating ? Number(product.rating).toFixed(1) : 'No rating'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingProduct(product);
                                        setIsEditing(true);
                                    }}
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

            {/* Edit Product Modal */}
            {isEditing && (
                <EditProductModal
                    product={editingProduct}
                    onUpdate={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default ManageProducts;

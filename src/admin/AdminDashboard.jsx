import { useState, useContext } from 'react';
import myContext from '../context/data/myContext';

const AdminDashboard = () => {
    const { product, setProduct, addProduct, deleteProduct, updateProduct, products, isLoading,categories, addCategory, deleteCategory } = useContext(myContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingProduct(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setProduct(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateProduct(editingProduct.id, editingProduct);
            setIsEditing(false);
            setEditingProduct(null);
        } else {
            await addProduct();
        }
    };

    const handleEdit = (prod) => {
        setIsEditing(true);
        setEditingProduct(prod);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingProduct(null);
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        await addCategory();
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(categoryId);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={(isEditing ? editingProduct?.title : product.title) || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={(isEditing ? editingProduct?.price : product.price) || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">MRP</label>
                        <input
                            type="number"
                            name="mrp"
                            value={(isEditing ? editingProduct?.mrp : product.mrp) || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={(isEditing ? editingProduct?.imageUrl : product.imageUrl) || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={(isEditing ? editingProduct?.description : product.description) || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Category</label>
                        <select
                            name="category"
                            value={(isEditing ? editingProduct?.category : product.category) || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Restoratives">Restoratives</option>
                            <option value="Sterilization">Sterilization</option>
                            <option value="Endodontics">Endodontics</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : (isEditing ? 'Update Product' : 'Add Product')}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="mb-8">  
                <button
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Category
                </button>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div key={category.id} className="border rounded-lg p-4 shadow">
                            <div className="font-bold mb-2 text-gray-800 bg-green-100 h-20 w-full">{category.name}</div>
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Delete Category
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Product List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((prod) => (
                        <div key={prod.id} className="border rounded-lg p-4 shadow">
                            <img src={prod.imageUrl} alt={prod.title} className="w-full h-48 object-cover mb-2 rounded" />
                            <h3 className="font-bold">{prod.title}</h3>
                            <p className="text-gray-600">{prod.description}</p>
                            <p className="mt-2">
                                <span className="font-bold">Price:</span> ₹{prod.price}
                            </p>
                            <p>
                                <span className="font-bold">MRP:</span> ₹{prod.mrp}
                            </p>
                            <p>
                                <span className="font-bold">Category:</span> {prod.category}
                            </p>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(prod)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(prod.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

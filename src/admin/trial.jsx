import { useState } from 'react';
import { useContext } from 'react';
import myContext from '../context/data/myContext';

const Trial = () => {
    const { products, setProducts, addProduct } = useContext(myContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducts(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addProduct();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={products.title || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={products.price || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">MRP</label>
                    <input
                        type="number"
                        name="mrp"
                        value={products.mrp || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={products.imageUrl || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={products.description || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                </div>
                <div>
                    <label className="block mb-1">Category</label>
                    <select
                        name="category"
                        value={products.category || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="instruments">Instruments</option>
                        <option value="consumables">Consumables</option>
                        <option value="equipment">Equipment</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default Trial;

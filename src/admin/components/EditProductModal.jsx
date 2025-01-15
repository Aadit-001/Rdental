import React from 'react';
import {useContext} from 'react';
import myContext from '../../context/data/myContext';

const EditProductModal = ({ product, onUpdate, onClose }) => {
    const {categories} = useContext(myContext);
    const [title, setTitle] = React.useState(product.title);
    const [price, setPrice] = React.useState(product.price);
    const [category, setCategory] = React.useState(product.category);
    const [mrp, setMrp] = React.useState(product.mrp);
    const [description, setDescription] = React.useState(product.description);
    const [rating, setRating] = React.useState(product.rating);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...product, title, price, category, mrp, description, rating });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-1">Product Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product Title"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <label className="block mb-1">Product Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Product Price"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <label className="block mb-1">MRP</label>
                    <input
                        type="number"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                        placeholder="MRP"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <label className="block mb-1">Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <label className="block mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Product Description"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <label className="block mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    >
                        <option value="">Select Category</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))
                        }
                    </select>
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;

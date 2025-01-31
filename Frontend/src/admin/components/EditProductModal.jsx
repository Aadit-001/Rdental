import React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import myContext from '../../context/data/myContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const EditProductModal = ({ product, onUpdate, onClose }) => {
    const {categories} = useContext(myContext);
    const [title, setTitle] = React.useState(product.title);
    const [price, setPrice] = React.useState(product.price);
    const [category, setCategory] = React.useState(product.category);
    const [mrp, setMrp] = React.useState(product.mrp);
    const [description, setDescription] = React.useState(product.description);
    const [rating, setRating] = React.useState(product.rating);
     const [imageUrl, setImageUrl] = React.useState(product.imageUrl);
    const [imageFile, setImageFile] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.match('image.*')) {
                toast.error('Please select an image file');
                return;
            }
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            setImageFile(file);
            // Create a preview URL
            setImageUrl(URL.createObjectURL(file));
        }
    };
    const uploadImage = async () => {
        if (!imageFile) return imageUrl;
        setIsUploading(true);
        try {
            const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error('Error uploading image:', error);
                        toast.error('Error uploading image');
                        setIsUploading(false);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setIsUploading(false);
                        resolve(downloadURL);
                    }
                );
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
            setIsUploading(false);
            return imageUrl;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUploading) {
            toast.error('Please wait for image upload to complete');
            return;
        }
        try {
            let finalImageUrl = imageUrl;
            if (imageFile) {
                finalImageUrl = await uploadImage();
            }
            // Convert rating to number and ensure it's between 0 and 5
            const validatedRating = rating ? Math.min(Math.max(Number(rating), 0), 5) : null;
            
            onUpdate({
                ...product,
                title,
                price: Number(price),
                category,
                mrp: Number(mrp),
                description,
                rating: validatedRating,
                imageUrl: finalImageUrl
            });
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                <form onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
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
                            <label className="block mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Product Image</label>
                            <div className="mb-4">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt="Product"
                                        className="w-full h-48 object-cover rounded mb-2"
                                    />
                                )}
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                {isUploading && (
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-green-600 h-2.5 rounded-full"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Uploading: {Math.round(uploadProgress)}%
                                        </p>
                                    </div>
                                )}
                            </div>
                            <label className="block mb-1">Rating (0-5)</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="Rating"
                                min="0"
                                max="5"
                                step="0.1"
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                        </div>
                    </div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Product Description"
                         rows="4"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className={`px-4 py-2 text-white rounded ${
                                isUploading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {isUploading ? 'Uploading...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EditProductModal.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        mrp: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditProductModal;

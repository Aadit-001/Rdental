import { useState, useContext, useRef } from 'react';
import myContext from '../../context/data/myContext';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { product, setProduct, addProduct, categories } = useContext(myContext);
    const [loading, setLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [stream, setStream] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteImage = async () => {
        try {
            if (product.imageUrl && product.imageUrl.includes('firebase')) {
                // Create a reference to the image in Firebase Storage
                const imageRef = ref(storage, product.imageUrl);
                // Delete the image
                await deleteObject(imageRef);
            }
            // Clear the imageUrl from the product state
            setProduct(prev => ({
                ...prev,
                imageUrl: null
            }));
            toast.success('Image deleted successfully!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image');
        }
    };

    const handleFileUpload = async (file) => {
        try {
            setUploadLoading(true);
            const timestamp = new Date().getTime();
            const storageRef = ref(storage, `product-images/${timestamp}_${file.name}`);
            
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            
            setProduct(prev => ({
                ...prev,
                imageUrl: downloadURL
            }));
            toast.success('Image uploaded successfully!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await handleFileUpload(file);
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
            setShowCamera(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            toast.error('Failed to access camera');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setShowCamera(false);
    };

    const capturePhoto = async () => {
        try {
            const video = videoRef.current;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            
            canvas.toBlob(async (blob) => {
                const file = new File([blob], `capture_${new Date().getTime()}.jpg`, { type: 'image/jpeg' });
                await handleFileUpload(file);
                stopCamera();
            }, 'image/jpeg');
        } catch (error) {
            console.error('Error capturing photo:', error);
            toast.error('Failed to capture photo');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addProduct();
            toast.success('Product added successfully!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        } catch (error) {
            console.error(error);
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={product.title || ''}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={product.category || ''}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price || ''}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">MRP</label>
                        <input
                            type="number"
                            name="mrp"
                            value={product.mrp || ''}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                        <input
                            type="number"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            value={product.rating || ''}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">Enter a rating between 0 and 5 stars</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                        <div className="space-y-4">
                            {product.imageUrl && (
                                <div className="w-48 h-48 relative group">
                                    <img 
                                        src={product.imageUrl} 
                                        alt="Product preview" 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleDeleteImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                                                 hover:bg-red-600 transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            
                            {showCamera && (
                                <div className="relative w-full max-w-md">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full rounded-lg"
                                    ></video>
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={capturePhoto}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                        >
                                            Capture
                                        </button>
                                        <button
                                            type="button"
                                            onClick={stopCamera}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    disabled={uploadLoading}
                                >
                                    {uploadLoading ? 'Uploading...' : 'Upload Image'}
                                </button>
                                {!showCamera ? (
                                    <button
                                        type="button"
                                        onClick={startCamera}
                                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                                    >
                                        Take Photo
                                    </button>
                                ) : null}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={product.imageUrl || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={product.description || ''}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

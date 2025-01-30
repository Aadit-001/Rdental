import {useContext} from 'react';
import myContext from '../../context/data/myContext';

const AddCatagory = () => {
    const {categories, addCategory, deleteCategory} = useContext(myContext);

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
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Category Management</h1>
                    <p className="text-gray-600">Organize your products by managing categories</p>
                </div>
                <button
                    onClick={handleAddCategory}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg 
                             hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200
                             shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Category
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300
                                 border border-gray-100 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-green-50 rounded-lg px-4 py-3 w-full">
                                    <h3 className="text-xl font-semibold text-gray-800 break-words">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="w-full mt-4 bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg
                                         hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Delete Category
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {categories.length === 0 && (
                <div className="text-center py-12">
                    <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm1 0v1h8V3a1 1 0 00-1-1H7a1 1 0 00-1 1zm10 4H4v11h12V7z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Categories Yet</h3>
                        <p className="text-gray-600">Start by adding your first category to organize your products.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCatagory;
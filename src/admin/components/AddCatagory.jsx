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
        <div>
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
        </div>
    );
};

export default AddCatagory;
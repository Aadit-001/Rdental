import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaBoxes, FaShoppingCart, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/adminPage', icon: FaHome, text: 'Dashboard' },
        { path: '/adminPage/add-product', icon: FaPlus, text: 'Add Product' },
        { path: '/adminPage/add-category', icon: FaPlus, text: 'Add Category' },
        { path: '/adminPage/products', icon: FaBoxes, text: 'Manage Products' },
        { path: '/adminPage/orders', icon: FaShoppingCart, text: 'Orders' },
        { path: '/adminPage/users', icon: FaUsers, text: 'Users' }
    ];
    
    return (
        <div className="bg-white w-64 shadow-lg fixed top-0 left-0 h-screen overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
            </div>
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.text}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/adminPage'}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-600 hover:bg-blue-50'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

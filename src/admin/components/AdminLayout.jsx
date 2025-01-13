import { Link, useLocation, Outlet } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiUsers, FiLogOut } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/adminPage', icon: <FiGrid />, label: 'Dashboard' },
        { path: '/adminPage/add-product', icon: <AiOutlinePlus />, label: 'Add Product' },
        { path: '/adminPage/products', icon: <FiPackage />, label: 'Manage Products' },
        { path: '/adminPage/orders', icon: <FiShoppingBag />, label: 'Orders' },
        { path: '/adminPage/users', icon: <FiUsers />, label: 'Users' },
    ];

    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64">
                    <div className="bg-white h-[60vh] shadow-lg flex flex-col mt-28 overflow-auto">
                        <div className="p-4 border-b">
                            <Link to="/" className="text-2xl font-bold text-blue-600">R-Dental</Link>
                        </div>
                        <nav className="flex-1 p-4">
                            <ul className="space-y-2">
                                {menuItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                                location.pathname === item.path
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-600 hover:bg-blue-50'
                                            }`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="p-4 border-t">
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 p-3 rounded-lg w-full text-gray-600 hover:bg-red-50 hover:text-red-500"
                            >
                                <FiLogOut className="text-xl" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="p-8 max-w-7xl mx-auto mt-28">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

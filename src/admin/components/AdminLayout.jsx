import { Link, useLocation, Outlet } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiUsers, FiMessageSquare } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/adminPage', icon: <FiGrid />, label: 'Dashboard' },
        { path: '/adminPage/add-product', icon: <AiOutlinePlus />, label: 'Add Product' },
        { path: '/adminPage/add-category', icon: <AiOutlinePlus />, label: 'Add Category' },
        { path: '/adminPage/products', icon: <FiPackage />, label: 'Manage Products' },
        { path: '/adminPage/orders', icon: <FiShoppingBag />, label: 'Orders' },
        { path: '/adminPage/users', icon: <FiUsers />, label: 'Users' },
        { path: '/adminPage/messages', icon: <FiMessageSquare />, label: 'Messages' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-60">
                    <div className="bg-gradient-to-b from-teal-50 via-teal-100/80 to-teal-50 h-fit shadow-lg flex flex-col mt-28 rounded-xl mx-4 border border-teal-100">
                        <nav className="flex-1 py-5 px-4">
                            <ul className="space-y-3">
                                {menuItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                                                location.pathname === item.path
                                                    ? 'bg-teal-600/10 text-teal-800 shadow-sm transform scale-[1.02]'
                                                    : 'text-teal-700 hover:bg-teal-50 hover:text-teal-900 hover:transform hover:translate-x-1'
                                            }`}
                                        >
                                            <span className={`text-lg ${location.pathname === item.path ? 'text-teal-700' : 'text-teal-600'}`}>
                                                {item.icon}
                                            </span>
                                            <span className="font-medium text-sm tracking-wide">
                                                {item.label}
                                            </span>
                                            {location.pathname === item.path && (
                                                <span className="ml-auto text-teal-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
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

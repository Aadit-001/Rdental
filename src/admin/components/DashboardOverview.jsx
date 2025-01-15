import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { useEffect, useState } from 'react';

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        revenue: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const productsRef = collection(fireDB, 'products');
            const ordersRef = collection(fireDB, 'orders');
            const usersRef = collection(fireDB, 'users');

            const productsSnapshot = await getDocs(productsRef);
            const ordersSnapshot = await getDocs(ordersRef);
            const usersSnapshot = await getDocs(usersRef);

            const productsCount = productsSnapshot.docs.length;
            const ordersCount = ordersSnapshot.docs.length;
            const usersCount = usersSnapshot.docs.length;
            let revenue = 0;

            ordersSnapshot.docs.forEach((order) => {
                revenue += order.data().totalPrice;
            });

            setStats({
                products: productsCount,
                orders: ordersCount,
                users: usersCount,
                revenue: revenue.toFixed(2),
            });
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* Admin Welcome Section */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 shadow-sm border border-teal-100">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome back, Suresh!</h2>
                        <p className="text-gray-600">Here's what's happening with your store today.</p>
                        <div className="flex items-center space-x-4 mt-4">
                            <div className="flex items-center text-gray-600">
                                <FiCalendar className="mr-2" />
                                <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <div className="bg-teal-100 rounded-full p-2">
                                    <FiDollarSign className="text-teal-600" />
                                </div>
                                <span className="text-sm">${stats.revenue}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <div className="bg-cyan-100 rounded-full p-2">
                                    <FiUsers className="text-cyan-600" />
                                </div>
                                <span className="text-sm">{stats.users}</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold">
                                <FiTrendingUp className="animate-bounce" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: 'Total Products',
                        value: stats.products,
                        icon: <FiPackage className="text-xl" />,
                        color: 'bg-gradient-to-r from-blue-400 to-blue-500',
                        textColor: 'text-blue-600',
                    },
                    {
                        title: 'Total Orders',
                        value: stats.orders,
                        icon: <FiShoppingBag className="text-xl" />,
                        color: 'bg-gradient-to-r from-green-400 to-green-500',
                        textColor: 'text-green-600',
                    },
                    {
                        title: 'Total Users',
                        value: stats.users,
                        icon: <FiUsers className="text-xl" />,
                        color: 'bg-gradient-to-r from-purple-400 to-purple-500',
                        textColor: 'text-purple-600',
                    },
                    {
                        title: 'Revenue',
                        value: `₹${stats.revenue}`,
                        icon: <FiDollarSign className="text-xl" />,
                        color: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
                        textColor: 'text-yellow-600',
                    },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-xl ${stat.color} text-white mr-4`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardOverview;

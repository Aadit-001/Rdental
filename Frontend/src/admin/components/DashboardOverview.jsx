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
            try {
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

                // Calculate total revenue from all orders
                ordersSnapshot.docs.forEach((orderDoc) => {
                    const orderData = orderDoc.data();
                    console.log('Processing order:', orderData);

                    // Get total from orderDetails
                    if (orderData.orderDetails) {
                        if (typeof orderData.orderDetails === 'object' && !Array.isArray(orderData.orderDetails)) {
                            // If orderDetails is an object with total
                            const total = parseFloat(orderData.orderDetails.total);
                            console.log('Order total from object:', total);
                            if (!isNaN(total)) {
                                revenue += total;
                            }
                        } else if (Array.isArray(orderData.orderDetails)) {
                            // If orderDetails is an array of items
                            const total = orderData.orderDetails.reduce((sum, item) => {
                                const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
                                return sum + itemTotal;
                            }, 0);
                            console.log('Order total from array:', total);
                            revenue += total;
                        }
                    }
                });

                console.log('Final total revenue:', revenue);

                setStats({
                    products: productsCount,
                    orders: ordersCount,
                    users: usersCount,
                    revenue: revenue.toFixed(2),
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    products: 0,
                    orders: 0,
                    users: 0,
                    revenue: '0.00',
                });
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8 p-6 bg-gray-50 rounded-3xl">
            {/* Admin Welcome Section */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome back, Suresh!</h2>
                        <p className="text-gray-600 text-lg">Here&apos;s what&apos;s happening with your store today.</p>
                        <div className="flex items-center space-x-6 mt-6">
                            <div className="flex items-center text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                                <FiCalendar className="mr-2 text-teal-500" />
                                <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                                <div className="bg-teal-100 rounded-full p-2">
                                    <span className="text-teal-600 font-bold">₹</span>
                                </div>
                                <span className="text-sm font-medium">₹{stats.revenue}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                                <div className="bg-cyan-100 rounded-full p-2">
                                    <FiUsers className="text-cyan-600" />
                                </div>
                                <span className="text-sm font-medium">{stats.users} active users</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                <FiTrendingUp className="" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        title: 'Total Products',
                        value: stats.products,
                        icon: <FiPackage className="text-2xl" />,
                        color: 'bg-gradient-to-r from-blue-400 to-blue-500',
                        textColor: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        title: 'Total Orders',
                        value: stats.orders,
                        icon: <FiShoppingBag className="text-2xl" />,
                        color: 'bg-gradient-to-r from-green-400 to-green-500',
                        textColor: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                    {
                        title: 'Total Users',
                        value: stats.users,
                        icon: <FiUsers className="text-2xl" />,
                        color: 'bg-gradient-to-r from-purple-400 to-purple-500',
                        textColor: 'text-purple-600',
                        bgColor: 'bg-purple-50',
                    },
                    {
                        title: 'Revenue',
                        value: `₹${stats.revenue}`,
                        icon: <FiDollarSign className="text-2xl" />,
                        color: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
                        textColor: 'text-yellow-600',
                        bgColor: 'bg-yellow-50',
                    },
                ].map((stat, index) => (
                    <div 
                        key={index} 
                        className={`${stat.bgColor} rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                    >
                        <div className="flex items-center">
                            <div className={`p-4 rounded-2xl ${stat.color} text-white mr-4 shadow-md`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardOverview;

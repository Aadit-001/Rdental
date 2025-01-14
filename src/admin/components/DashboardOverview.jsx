import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
                {
                    title: 'Total Products',
                    value: stats.products,
                    icon: <FiPackage />,
                    color: 'bg-blue-500',
                },
                {
                    title: 'Total Orders',
                    value: stats.orders,
                    icon: <FiShoppingBag />,
                    color: 'bg-green-500',
                },
                {
                    title: 'Total Users',
                    value: stats.users,
                    icon: <FiUsers />,
                    color: 'bg-purple-500',
                },
                {
                    title: 'Revenue',
                    value: `₹${stats.revenue}`,
                    icon: <FiDollarSign />,
                    color: 'bg-yellow-500',
                },
            ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.title}</p>
                            <p className="text-2xl font-semibold">{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardOverview;

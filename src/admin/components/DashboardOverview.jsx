import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

const DashboardOverview = () => {
    const stats = [
        {
            title: 'Total Products',
            value: '150',
            icon: <FiPackage />,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Orders',
            value: '50',
            icon: <FiShoppingBag />,
            color: 'bg-green-500',
        },
        {
            title: 'Total Users',
            value: '1,200',
            icon: <FiUsers />,
            color: 'bg-purple-500',
        },
        {
            title: 'Revenue',
            value: '₹50,000',
            icon: <FiDollarSign />,
            color: 'bg-yellow-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
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

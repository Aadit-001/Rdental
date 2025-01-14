const Orders = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-16rem)]">
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Products
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Sample row - Replace with actual data mapping */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12345</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                                <td className="px-6 py-4 text-sm text-gray-900">Dental Equipment (2)</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹25,000</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Shipped
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    Showing 1 to 10 of 50 entries
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Orders;

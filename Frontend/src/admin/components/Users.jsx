import { useState, useEffect } from "react";
import { collection, getDocs, query} from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const q = query(collection(fireDB, "users"));
                const querySnapshot = await getDocs(q);
                const usersData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                    };
                });
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-h-[calc(100vh-16rem)]">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Users ({users.length})</h2>
            
            {users.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No users found
                </div>
            ) : (
                <>
                    {/* Desktop/Tablet View */}
                    <div className="hidden md:block overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.displayName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {user.email}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {users.map((user) => (
                            <div 
                                key={user.id} 
                                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm font-semibold text-gray-900">
                                        User ID: {user.id}
                                    </div>
                                </div>

                                <div className="text-sm text-gray-700 mb-2">
                                    <strong>Name:</strong> {user.displayName}
                                </div>

                                <div className="text-sm text-gray-700">
                                    <strong>Email:</strong> {user.email}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;

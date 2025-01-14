import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import { useContext } from "react";
import myContext from "../context/data/myContext";
import EmptyOrders from "./emptyOrderPage.jsx";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useContext(myContext);

  useEffect(() => {
    const q = query(collection(fireDB, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          data.push({ ...doc.data(), id: doc.id });
        }
      });
      setOrders(data);
    });
    return unsubscribe;
  }, [userId]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)] py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center animate-fade-in-down relative group">
          <span className="inline-block">My Orders</span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {orders.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.id} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-blue-600 truncate">
                        {order.orderId}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="text-sm text-gray-500">
                          Total: ${order.total}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="text-sm text-gray-600">
                          Status: {order.status}
                        </p>
                        <p className="mt-2 sm:mt-0 sm:ml-4 text-sm text-gray-600">
                          Date:{" "}
                          {new Date(order.createdAt.toDate()).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyOrders />
        )}
      </div>
    </div>
  );
};

export default MyOrders;

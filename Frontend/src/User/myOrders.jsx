/* eslint-disable react/prop-types */
import  { useState, useEffect, useContext } from 'react';
import { FaClipboardList, FaBox, FaMoneyBillWave, FaShippingFast, FaBoxOpen, FaExclamationTriangle, FaShoppingBag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import myContext from "../context/data/myContext";
import Loader from '../Components/Loader';

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  try {
    let date;
    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (timestamp._seconds) {
      // Handle Firestore timestamp object
      date = new Timestamp(timestamp._seconds, timestamp._nanoseconds || 0).toDate();
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      console.error('Invalid timestamp format:', timestamp);
      return 'N/A';
    }

    if (isNaN(date.getTime())) {
      console.error('Invalid date object:', date);
      return 'N/A';
    }

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure order has default values to prevent undefined errors
  const safeOrder = {
    id: order.id || 'N/A',
    status: order.status || 'Processing',
    items: order.items || [],
    total: order.total || 0,
    createdAt: order.createdAt || new Date(),
    shippingAddress: order.shippingAddress || {},
    paymentMethod: order.paymentMethod || 'N/A'
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500 text-white';
      case 'processing':
        return 'bg-yellow-500 text-white';
      case 'shipped':
        return 'bg-blue-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 mb-6 mt-[-80px]"
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <FaClipboardList className="text-primary text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Order #{safeOrder.id}</h2>
              <p className="text-sm text-gray-500">
                {formatDate(safeOrder.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(safeOrder.status)}`}>
              {safeOrder.status}
            </span>
            <div className="sm:mt-2 text-right">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="font-bold text-lg text-primary">₹{safeOrder.total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <FaBox className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="font-semibold">{safeOrder.items.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <FaShippingFast className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Shipping Method</p>
              <p className="font-semibold">{safeOrder.shippingMethod || 'Standard Delivery'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <FaMoneyBillWave className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold">{safeOrder.paymentMethod}</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '0' }}
          className="overflow-hidden"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 pt-4 border-t border-gray-200"
              >
                {safeOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-product.png';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <FaBoxOpen className="text-gray-400 text-2xl" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.title || 'Unnamed Item'}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{(item.price || 0).toLocaleString('en-IN')}</p>
                      <p className="text-sm text-gray-600">Per Unit</p>
                    </div>
                  </div>
                ))}

                {safeOrder.shippingAddress && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                    <div className="text-gray-600">
                      <p className="font-medium">{safeOrder.shippingAddress.firstName} {safeOrder.shippingAddress.lastName}</p>
                      <p>{safeOrder.shippingAddress.street}</p>
                      <p>{safeOrder.shippingAddress.city}, {safeOrder.shippingAddress.state}</p>
                      <p>PIN: {safeOrder.shippingAddress.pincode}</p>
                      {safeOrder.shippingAddress.phone && (
                        <p className="mt-1">Phone: {safeOrder.shippingAddress.phone}</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full text-center text-primary font-semibold hover:text-primary-dark transition-colors"
        >
          {isExpanded ? 'Show Less' : 'View Details'}
        </button>
      </div>
    </motion.div>
  );
};

const EmptyOrderPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
      <FaShoppingBag className="text-gray-400 text-4xl" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
    <p className="text-gray-600 mb-8">Looks like you haven&apos;t placed any orders yet.</p>
    <a
      href="/products"
      className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
    >
      Start Shopping
    </a>
  </motion.div>
);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUserId } = useContext(myContext);

  useEffect(() => {
    let isMounted = true;
    
    const fetchUserOrders = async () => {
      if (!currentUserId) return;

      try {
        const userDocRef = doc(fireDB, "users", currentUserId);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!isMounted) return;
        
        if (!userDocSnap.exists() || !userDocSnap.data().orders || userDocSnap.data().orders.length === 0) {
          setOrders([]);
          setIsLoading(false);
          return;
        }

        const orderIds = userDocSnap.data().orders;
        
        const orderPromises = orderIds.map(async (orderId) => {
          const orderDocRef = doc(fireDB, "orders", orderId);
          const orderDocSnap = await getDoc(orderDocRef);
          
          if (orderDocSnap.exists()) {
            const orderData = orderDocSnap.data();
            
            const itemsWithDetails = await Promise.all(
              (orderData.orderDetails?.items || []).map(async (item) => {
                try {
                  const productDocRef = doc(fireDB, "products", item.productId || item.id);
                  const productDocSnap = await getDoc(productDocRef);
                  
                  if (productDocSnap.exists()) {
                    const productData = productDocSnap.data();
                    return {
                      ...item,
                      title: productData.title || item.title,
                      image: productData.thumbnail || productData.imageUrl || item.image,
                      price: item.price || productData.price,
                      quantity: item.quantity || 1,
                      description: productData.description
                    };
                  }
                  return {
                    ...item,
                    image: item.thumbnail || item.imageUrl || item.image,
                    title: item.title || 'Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1
                  };
                } catch (err) {
                  console.error("Error fetching product details:", err);
                  return {
                    ...item,
                    image: item.thumbnail || item.imageUrl || item.image,
                    title: item.title || 'Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1
                  };
                }
              })
            );

            let createdAt;
            try {
              if (orderData.createdAt instanceof Timestamp) {
                createdAt = orderData.createdAt;
              } else if (orderData.createdAt?._seconds) {
                createdAt = new Timestamp(
                  orderData.createdAt._seconds,
                  orderData.createdAt._nanoseconds || 0
                );
              } else if (typeof orderData.createdAt === 'string') {
                const parsedDate = new Date(orderData.createdAt);
                if (!isNaN(parsedDate.getTime())) {
                  createdAt = Timestamp.fromDate(parsedDate);
                } else {
                  createdAt = Timestamp.now();
                }
              } else if (orderData.createdAt instanceof Date) {
                createdAt = Timestamp.fromDate(orderData.createdAt);
              } else {
                console.warn("Invalid or missing createdAt format:", orderData.createdAt);
                createdAt = Timestamp.now();
              }
            } catch (error) {
              console.error("Error processing date:", error);
              createdAt = Timestamp.now();
            }

            const total = orderData.orderDetails?.total || 
                         orderData.total || 
                         itemsWithDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Extract shipping address from various possible locations
            let shippingAddress = null;
            
            if (orderData.userInfo) {
              shippingAddress = {
                street: orderData.userInfo.address || '',
                city: orderData.userInfo.city || '',
                state: orderData.userInfo.state || '',
                pincode: orderData.userInfo.pincode || '',
                firstName: orderData.userInfo.firstName || '',
                lastName: orderData.userInfo.lastName || '',
                phone: orderData.userInfo.phone || ''
              };
            } else if (orderData.addressInfo) {
              shippingAddress = orderData.addressInfo;
            }

            return {
              ...orderData,
              id: orderDocSnap.id,
              createdAt: createdAt,
              status: orderData.orderStatus || orderData.status || 'Processing',
              items: itemsWithDetails,
              total: total,
              shippingAddress: shippingAddress,
              paymentMethod: orderData.paymentMethod || orderData.paymentDetails?.method || 'Standard Payment'
            };
          }
          return null;
        });

        const fetchedOrders = await Promise.all(orderPromises);
        const validOrders = fetchedOrders.filter(order => order !== null);

        const sortedOrders = validOrders.sort((a, b) => {
          const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });

        if (isMounted) {
          setOrders(sortedOrders);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchUserOrders();

    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  if (isLoading) {

    return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Loader />
    </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to Load Orders
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center animate-fade-in-down relative group">
          <span className="inline-block">My Orders</span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </h1>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-8 bg-primary">
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <FaClipboardList className="text-white text-3xl" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence>
              {orders.length > 0 ? (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="space-y-6"
                >
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </motion.div>
              ) : (
                <EmptyOrderPage />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;

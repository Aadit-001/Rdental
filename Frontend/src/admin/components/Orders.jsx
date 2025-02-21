/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { FaTimes, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBox, FaCreditCard, FaPrint } from 'react-icons/fa';
import axios from 'axios';

const OrderModal = ({ order, onClose }) => {
    const printRef = useRef();
    const [orderProducts, setOrderProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);

                if (!order.orderDetails) {
                    setOrderProducts([]);
                    return;
                }

                // Ensure orderDetails is an array
                const details = Array.isArray(order.orderDetails.items) ? order.orderDetails.items : [order.orderDetails.items];

                const productsWithDetails = await Promise.all(
                    details.map(async (item) => {
                        try {
                            // Extract product ID
                            const productId = item.productId || item.id;
                            if (!productId) {
                                return {
                                    ...item,
                                    title: item.title || 'Unknown Product',
                                    price: parseFloat(item.price) || 0,
                                    quantity: parseInt(item.quantity) || 1,
                                    image: item.imageUrl || item.image || '',
                                    totalPrice: (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
                                };
                            }

                            // Fetch product details from Firestore
                            const productRef = doc(fireDB, 'products', productId);
                            const productSnap = await getDoc(productRef);
                            
                            if (productSnap.exists()) {
                                const productData = productSnap.data();
                                
                                return {
                                    ...item,
                                    title: productData.title || item.title || 'Unknown Product',
                                    price: parseFloat(productData.price) || parseFloat(item.price) || 0,
                                    quantity: parseInt(item.quantity) || 1,
                                    image: productData.imageUrl || productData.image || item.imageUrl || item.image || '',
                                    totalPrice: (parseFloat(productData.price) || parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
                                };
                            } else {
                                return {
                                    ...item,
                                    title: item.title || 'Unknown Product',
                                    price: parseFloat(item.price) || 0,
                                    quantity: parseInt(item.quantity) || 1,
                                    image: item.imageUrl || item.image || '',
                                    totalPrice: (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
                                };
                            }
                        } catch (error) {
                            console.error('Error processing product:', error);
                            return {
                                ...item,
                                title: item.title || 'Unknown Product',
                                price: parseFloat(item.price) || 0,
                                quantity: parseInt(item.quantity) || 1,
                                totalPrice: (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
                            };
                        }
                    })
                );

                setOrderProducts(productsWithDetails.filter(product => product !== null));
            } catch (error) {
                console.error('Error fetching product details:', error);
                toast.error('Error loading product details');
                setOrderProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (order) {
            fetchProductDetails();
        }
    }, [order]);

    // const calculateTotal = () => {
    //     return orderProducts.reduce((total, item) => total + (item.totalPrice || 0), 0);
    // };

    const handlePrint = () => {
        const printContent = printRef.current;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Order Details</h2>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={handlePrint}
                                className="text-gray-500 hover:text-gray-700"
                                title="Print Order"
                            >
                                <FaPrint size={20} />
                            </button>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <div ref={printRef}>
                            {/* Order ID and Date */}
                            <div className="mb-6">
                                <div className="text-lg font-semibold text-gray-800">Order #{order.orderId}</div>
                                <div className="text-sm text-gray-500">
                                    Placed on: {order.orderDate} at {order.orderTime}
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <FaUser className="mr-2" /> Customer Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                        <FaUser className="mt-1 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Name</div>
                                            <div>{order.userInfo?.firstName} {order.userInfo?.lastName}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaEnvelope className="mt-1 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Email</div>
                                            <div>{order.userInfo?.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaPhone className="mt-1 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Phone</div>
                                            <div>{order.userInfo?.phone || 'N/A'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="mt-1 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Address</div>
                                            <div>{order.userInfo?.address || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <FaBox className="mr-2" /> Order Items
                                </h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Image</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {orderProducts.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.title}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        {item.image ? (
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.title}
                                                                className="h-16 w-16 object-cover rounded inline-block"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = '/placeholder.png';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="h-16 w-16 bg-gray-200 rounded inline-flex items-center justify-center">
                                                                <FaBox className="text-gray-400" size={24} />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                                        {new Intl.NumberFormat('en-IN', {
                                                            style: 'currency',
                                                            currency: 'INR',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(item.price)}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                                        {new Intl.NumberFormat('en-IN', {
                                                            style: 'currency',
                                                            currency: 'INR',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(item.totalPrice)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                                    <tbody>
                                                        <tr className="bg-gray-50">
                                                            <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Subtotal:</td>
                                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                                                {new Intl.NumberFormat('en-IN', {
                                                                    style: 'currency',
                                                                    currency: 'INR',
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                }).format((order.orderDetails?.subtotal || 0))}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                        <tbody>
                                            <tr className="bg-gray-50">
                                                <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total Tax:</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                                    {new Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'INR',
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    }).format((order.orderDetails?.tax || 0))}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr className="bg-gray-50">
                                                <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Shipping:</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                                    {new Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'INR',
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    }).format((order.orderDetails?.shipping || 0))}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-gray-50">
                                                <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total Amount:</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                                    {new Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'INR',
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    }).format((order.orderDetails?.total || 0))}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <FaCreditCard className="mr-2" /> Payment Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="font-medium">Payment Method</div>
                                        <div className="text-gray-700">{order.paymentMethod}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">Payment Status</div>
                                        <div className="text-gray-700">{
                                            (order?.paymentDetails?.razorpay_payment_id && order.paymentMethod === 'cardOrUpi') ? 'Paid' : 'Not Paid'
                                        }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const ordersPerPage = 10;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const ordersRef = collection(fireDB, 'orders');
            const q = query(ordersRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            
            const ordersData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    orderDetails: data.orderDetails || [] // Ensure orderDetails is always an array
                };
            });
            
            setOrders(ordersData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(fireDB, 'orders', orderId);
            const orderDoc = await getDoc(orderRef);
            const orderData = orderDoc.data();

            // Check if order is already cancelled or delivered
            if (orderData.orderStatus === 'cancelled') {
                toast.error('Cannot modify a cancelled order');
                return;
            }
            if (orderData.orderStatus === 'delivered') {
                toast.error('Cannot modify a delivered order');
                return;
            }

            await updateDoc(orderRef, {
                orderStatus: newStatus,
                lastUpdated: new Date().toISOString()
            });
            
            // Send cancellation email if status is changed to 'cancelled'
            if (newStatus === 'cancelled') {
                await sendCancellationEmail(orderData);
            }
            
            // Send delivery confirmation email if status is changed to 'delivered'
            if (newStatus === 'delivered') {
                await sendDeliveryConfirmationEmail(orderData);
            }
            
            toast.success('Order status updated successfully');
            fetchOrders(); // Refresh orders list
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        }
    };

    const sendCancellationEmail = async (orderData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-email`, {
                to: orderData.userInfo.email,
                subject: "Order Cancellation Notice",
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="background-color:#e74c3c; color: white; padding: 20px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            <h1 style="margin: 0; font-size: 24px;">Order Cancellation Notice</h1>
                        </div>
                        
                        <div style="padding: 20px; background-color: white; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                            <p style="color: #333; line-height: 1.6;">Dear ${orderData.userInfo.firstName},</p>
                            
                            <p style="color: #333; line-height: 1.6;">
                                We regret to inform you that your order has been cancelled. We apologize for any inconvenience this may cause.
                            </p>
                            
                            <div style="background-color: #fff3f3; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ffe6e6;">
                                <h2 style="margin-top: 0; color: #c0392b; border-bottom: 1px solid #ffe6e6; padding-bottom: 10px;">Cancelled Order Details</h2>
                                <p style="margin: 10px 0;"><strong>Order Number:</strong> ${orderData.orderId}</p>
                                <p style="margin: 10px 0;"><strong>Order Date:</strong> ${orderData.orderDate}</p>
                                <p style="margin: 10px 0;"><strong>Total Amount:</strong> ₹${orderData.orderDetails?.total}</p>
                            </div>

                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #495057;">Order Summary:</h3>
                                ${orderData.orderDetails?.items.map(item => `
                                    <p style="margin: 5px 0;">
                                        ${item.title} x ${item.quantity} - ₹${item.price * item.quantity}
                                    </p>
                                `).join('')}
                            </div>
                            
                            <p style="color: #333; line-height: 1.6;">
                                If you have already made a payment for this order, a refund will be processed according to our refund policy.
                            </p>
                            
                            <p style="color: #333; line-height: 1.6;">
                                If you have any questions about this cancellation or need further assistance, please don't hesitate to contact our customer support team.
                            </p>
                            
                            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; text-align: center;">
                                <p style="color: #666; font-size: 14px;">
                                    Best regards,<br>
                                    <strong>RDental Customer Care Team</strong>
                                </p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 10px; color: #888; font-size: 12px;">
                            © ${new Date().getFullYear()} RDental. All rights reserved.
                        </div>
                    </div>
                `
            });

            console.log('Cancellation email sent successfully');
        } catch (error) {
            console.error('Error sending cancellation email:', error);
            toast.error('Failed to send cancellation email');
        }
    };

    const sendDeliveryConfirmationEmail = async (orderData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-email`, {
                to: orderData.userInfo.email,
                subject: "Order Delivered Successfully",
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="background-color:#2ecc71; color: white; padding: 20px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            <h1 style="margin: 0; font-size: 24px;">Order Delivered Successfully!</h1>
                        </div>
                        
                        <div style="padding: 20px; background-color: white; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                            <p style="color: #333; line-height: 1.6;">Dear ${orderData.userInfo.firstName},</p>
                            
                            <p style="color: #333; line-height: 1.6;">
                                Great news! Your order has been successfully delivered. We hope you are satisfied with your purchase.
                            </p>
                            
                            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #e6f2ff;">
                                <h2 style="margin-top: 0; color: #0077be; border-bottom: 1px solid #e6f2ff; padding-bottom: 10px;">Order Details</h2>
                                <p style="margin: 10px 0;"><strong>Order Number:</strong> ${orderData.orderId}</p>
                                <p style="margin: 10px 0;"><strong>Order Date:</strong> ${orderData.orderDate}</p>
                                <p style="margin: 10px 0;"><strong>Total Amount:</strong> ₹${orderData.orderDetails?.total}</p>
                            </div>

                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #495057;">Order Summary:</h3>
                                ${orderData.orderDetails?.items.map(item => `
                                    <p style="margin: 5px 0;">
                                        ${item.title} x ${item.quantity} - ₹${item.price * item.quantity}
                                    </p>
                                `).join('')}
                            </div>
                            
                            <p style="color: #333; line-height: 1.6;">
                                If you have any questions about your order or need assistance, please don't hesitate to contact our customer support team.
                            </p>
                            
                            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; text-align: center;">
                                <p style="color: #666; font-size: 14px;">
                                    Thank you for shopping with us!<br>
                                    <strong>RDental Customer Care Team</strong>
                                </p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 10px; color: #888; font-size: 12px;">
                            © ${new Date().getFullYear()} RDental. All rights reserved.
                        </div>
                    </div>
                `
            });

            console.log('Delivery confirmation email sent successfully');
        } catch (error) {
            console.error('Error sending delivery confirmation email:', error);
            toast.error('Failed to send delivery confirmation email');
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    // Pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-green-100 text-green-800';
            case 'delivered':
                return 'bg-green-200 text-green-900';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-16rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-h-[calc(100vh-16rem)]">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Orders ({orders.length})</h2>
            {orders.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No orders found
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
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Details
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
                                    {currentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.orderId || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.userInfo?.firstName || 'Unknown'} {order.userInfo?.lastName || ''}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {Array.isArray(order?.orderDetails?.items) ? (
                                                    <div className="space-y-1">
                                                        {order.orderDetails.items.map((item, index) => (
                                                            <div key={index}>
                                                                {item.title} x {item.quantity}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    'No items'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatCurrency(order.orderDetails?.total || 0)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                                                    {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1) || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={() => handleViewOrder(order)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </button>
                                                    <select
                                                        value={order.orderStatus || ''}
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                        className={`block w-32 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                            order.orderStatus === 'cancelled' || order.orderStatus === 'delivered' 
                                                                ? 'opacity-50 cursor-not-allowed' 
                                                                : ''
                                                        }`}
                                                        disabled={order.orderStatus === 'cancelled' || order.orderStatus === 'delivered'}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {currentOrders.map((order) => (
                            <div 
                                key={order.id} 
                                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm font-semibold text-gray-900">
                                        Order #{order.orderId || 'N/A'}
                                    </div>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1) || 'Pending'}
                                    </span>
                                </div>

                                <div className="text-sm text-gray-700 mb-2">
                                    {order.userInfo?.firstName || 'Unknown'} {order.userInfo?.lastName || ''}
                                </div>

                                <div className="text-sm text-gray-700 mb-2">
                                    <strong>Items:</strong>
                                    {Array.isArray(order?.orderDetails?.items) ? (
                                        <div className="space-y-1 mt-1">
                                            {order.orderDetails.items.map((item, index) => (
                                                <div key={index} className="flex justify-between">
                                                    <span>{item.title}</span>
                                                    <span>x {item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        'No items'
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <div className="text-sm font-semibold text-gray-900">
                                        Total: {formatCurrency(order.orderDetails?.total || 0)}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleViewOrder(order)}
                                            className="text-blue-600 hover:text-blue-900 text-sm"
                                        >
                                            View
                                        </button>
                                        <select
                                            value={order.orderStatus || ''}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className={`block w-24 text-xs border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                order.orderStatus === 'cancelled' || order.orderStatus === 'delivered' 
                                                    ? 'opacity-50 cursor-not-allowed' 
                                                    : ''
                                            }`}
                                            disabled={order.orderStatus === 'cancelled' || order.orderStatus === 'delivered'}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default Orders;

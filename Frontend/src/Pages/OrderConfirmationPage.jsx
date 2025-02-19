import { useLocation, useNavigate } from 'react-router-dom';
import { doc, collection, addDoc, arrayUnion, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { fireDB } from './../firebase/firebaseConfig';
import { useEffect, useState, useRef, useContext } from 'react';
import { FaCheckCircle, FaTruck, FaExclamationTriangle, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCartAsync } from '../Redux/slices/cartSlice';
import myContext from '../context/data/myContext';
import Loader from '../Components/Loader';
import axios from 'axios';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCartItems, user } = useContext(myContext);
  const [isOrderProcessed, setIsOrderProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const processingRef = useRef(false);

  const {
    paymentDetails,
    orderDetails,
    paymentMethod,
    userId,
    userInfo,
    orderDate,
    orderTime,
    orderStatus,
    orderId,
  } = location.state || {};

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    if (!location.state || !orderId) {
      navigate('/');
      return;
    }

    const createOrderIfNotExists = async () => {
      if (processingRef.current || isProcessing) {
        return;
      }

      if (isOrderProcessed) {
        return;
      }

      try {
        setIsProcessing(true);
        processingRef.current = true;
        setError(null);

        const ordersCollection = collection(fireDB, 'orders');
        const q = query(ordersCollection, where('orderId', '==', orderId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          setIsOrderProcessed(true);
          return;
        }

        console.log(paymentDetails, orderDetails, paymentMethod, orderStatus, userInfo);

        if (!paymentDetails || !orderDetails || !paymentMethod || !orderStatus || !userInfo) {
          throw new Error('Missing required order information');
        }

        const orderData = {
          paymentDetails,
          orderDetails,
          paymentMethod,
          userId,
          userInfo: {
            ...userInfo,
            email: user?.email // Include email in userInfo
          },
          orderDate,
          orderTime,
          orderStatus,
          orderId,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };

        const newOrderRef = await addDoc(ordersCollection, orderData);

        if (userId) {
          const userInfoRef = doc(fireDB, 'users', userId);
          const userDoc = await getDoc(userInfoRef);

          if (userDoc.exists()) {
            // Update user document with new order and clear cart
            await updateDoc(userInfoRef, {
              orders: arrayUnion(newOrderRef.id),
              carts: [] // Clear the carts array
            });
          }

          // Clear Redux cart state
          await dispatch(clearCartAsync(userId)).unwrap();
          // Clear Context cart state
          setCartItems([]);
        }

        setIsOrderProcessed(true);

      } catch (error) {
        console.error('Error in order creation process:', error);
        setError(error.message);
      } finally {
        setIsProcessing(false);
        processingRef.current = false;
      }
    };

    if (orderId && !isOrderProcessed && !isProcessing) {
      createOrderIfNotExists();
    }
  }, [location.state, orderId, isOrderProcessed, isProcessing, navigate, dispatch]);


  const sendEmail = async () => {
    try {
      // Check if email has already been sent for this order
      const emailSentKey = `email_sent_${orderId}`;
      const hasEmailBeenSent = localStorage.getItem(emailSentKey);
      
      if (hasEmailBeenSent) {
        console.log('Email already sent for this order');
        return;
      }

      // Replace with your backend URL
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-email`, {
        to: `${user?.email}`,
        subject: "Order Confirmation Email",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background-color:#2ecc71 ; color: white; padding: 20px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
              <h1 style="margin: 0; font-size: 24px;">Order Confirmation</h1>
            </div>
            
            <div style="padding: 20px; background-color: white; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
              <p style="color: #333; line-height: 1.6;">Dear Valued Customer,</p>
              
              <p style="color: #333; line-height: 1.6;">
                Thank you for choosing RDental. We are pleased to confirm that we have received your order and are processing it with the utmost care.
              </p>
              
              <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #e6f2ff;">
                <h2 style="margin-top: 0; color: #0077be; border-bottom: 1px solid #e6f2ff; padding-bottom: 10px;">Order Details</h2>
                <p style="margin: 10px 0;"><strong>Order Number:</strong> ${orderId}</p>
                <p style="margin: 10px 0;"><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p style="margin: 10px 0;"><strong>Total Amount:</strong> ${orderDetails?.total}</p>
              </div>
              
              <p style="color: #333; line-height: 1.6;">
                Our team is diligently processing your order. We will send a shipping confirmation email with tracking details as soon as your package is dispatched.
              </p>
              
              <p style="color: #333; line-height: 1.6;">
                For any questions or concerns about your order, please contact our dedicated customer support team.
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
          </div>`
      });

      // Mark email as sent in localStorage
      localStorage.setItem(emailSentKey, 'true');
    } catch (error) {
      console.error('Email send error:', error);
    }
  };

  useEffect(() => {
    if (isOrderProcessed) {
      const emailSentKey = `email_sent_${orderId}`;
      const hasEmailBeenSent = localStorage.getItem(emailSentKey);
      
      if (!hasEmailBeenSent) {
        sendEmail();
      }
    }
  }, [isOrderProcessed, orderId]);

  if (error) {
    return (
      <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg text-center">
        <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Processing Order</h1>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="container h-screen w-screen mx-auto flex flex-col items-center justify-center">
        <Loader />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Processing Your Order...</h2>
        <p className="text-gray-600 mt-2">Please wait while we confirm your payment</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-2xl max-w-4xl mt-24">
      <div className="text-center mb-8">
        <FaCheckCircle className="text-primary text-6xl mx-auto mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold text-green-500 mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-600 text-lg font-medium">Order #{orderId}</p>
        <div className="mt-4">
          <span className={`inline-block px-6 py-2 rounded-full text-sm font-semibold ${orderStatus === 'completed' ? 'bg-green-100 text-green-800 border border-green-300' :
            orderStatus === 'processing' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
              'bg-gray-100 text-gray-800 border border-gray-300'
            }`}>
            {orderStatus?.charAt(0).toUpperCase() + orderStatus?.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="order-details">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaTruck className="mr-3 text-primary" /> Order Details
          </h2>
          <div className="space-y-6">
            {orderDetails?.items.map((item) => (
              <div key={item.id} className="flex items-start border-b border-gray-200 pb-6 transition-all hover:bg-gray-50 p-4 rounded-lg">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4 shadow-md">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.png'; // Add a placeholder image
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaExclamationTriangle className="text-gray-400 text-2xl" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800 hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm font-medium text-gray-700">Quantity: {item.quantity}</p>
                    <p className="font-bold text-primary text-lg">{formatCurrency(item.price)}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Subtotal</span>
                <span>{formatCurrency(orderDetails?.subtotal)}</span>
              </div>
              {orderDetails?.tax && (
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Tax</span>
                  <span>{formatCurrency(orderDetails.tax)}</span>
                </div>
              )}
              {orderDetails?.shipping && (
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span>{formatCurrency(orderDetails.shipping)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <p className="font-bold text-lg text-gray-800">Total Amount</p>
                <p className="font-bold text-2xl text-primary">{formatCurrency(orderDetails?.total)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6" id="payment-details">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-primary mr-3">💳</span> Payment Information
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 flex items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-semibold w-28">Method:</span>
                <span className="text-primary font-medium">{paymentMethod}</span>
              </p>
              <p className="text-gray-700 flex items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-semibold w-28">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${paymentMethod === 'Cash On Delivery' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                  paymentDetails?.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-300' :
                    'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  }`}>
                  {paymentMethod === 'Cash On Delivery' ? 'Pending' : paymentDetails?.status || 'Completed'}
                </span>
              </p>
              <p className="text-gray-700 flex items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-semibold w-28">Date:</span>
                <span>{orderDate} {orderTime}</span>
              </p>
              {paymentDetails?.transactionId && (
                <p className="text-gray-700 flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold w-28">Transaction:</span>
                  <span className="font-mono">{paymentDetails.transactionId}</span>
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md" id="delivery-details">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-primary mr-3">📍</span> Delivery Details
            </h2>
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                  <FaUser className="text-primary mr-2" /> Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">
                        {userInfo?.firstName} {userInfo?.lastName}
                      </p>
                      {/* {userInfo?.hospitalName && (
                        <p className="text-sm text-gray-600 mt-1">
                          {userInfo.hospitalName}
                        </p>
                      )} */}
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <FaEnvelope className="text-primary mr-3" />
                    <p className="text-gray-700">{user?.email}</p>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <FaPhone className="text-primary mr-3" />
                    <div>
                      <p className="text-gray-700">{userInfo?.phone}</p>
                      {/* {userInfo?.alternatePhone && (
                        <p className="text-sm text-gray-600 mt-1">
                          Alt: {userInfo.alternatePhone}
                        </p>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="text-primary mr-2" /> Shipping Address
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-700 space-y-2">
                    {/* {userInfo?.hospitalName && (
                      <p className="font-medium text-gray-800">{userInfo.hospitalName}</p>
                    )} */}
                    <p>{userInfo?.address}</p>
                    {/* <p>{userInfo?.address?.landmark && `Near ${userInfo.address.landmark}`}</p> */}
                    <p className="font-medium">
                      {userInfo?.city}
                      {userInfo?.state && `, ${userInfo.state}`}
                    </p>
                    <p className="font-medium">
                      {userInfo?.pincode || userInfo?.zipCode}
                    </p>
                    {userInfo?.country && (
                      <p>{userInfo.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Instructions */}
              {userInfo?.deliveryInstructions && (
                <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Delivery Instructions</h4>
                  <p className="text-yellow-700">{userInfo.deliveryInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600 mb-4">
          A confirmation email has been sent to {user?.email}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate('/myOrders')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            My Orders
          </button>
          <button
            onClick={() => {
              // Select the three divs you want to print
              const orderDetails = document.getElementById('order-details').innerHTML;
              const paymentDetails = document.getElementById('payment-details').innerHTML;
              const deliveryDetails = document.getElementById('delivery-details').innerHTML;

              // Create a new document for printing
              const printWindow = window.open('', '', 'width=600,height=800');

              // Construct the print content with some basic styling
              printWindow.document.write(`
                <html>
                  <head>
                    <title>Order Receipt</title>
                    <style>
                      body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                      .print-section { 
                        border: 1px solid #e0e0e0; 
                        margin-bottom: 20px; 
                        padding: 20px; 
                        page-break-inside: avoid; 
                      }
                      h2 { color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
                    </style>
                  </head>
                  <body>
                    <div class="print-section">
                      <h2>Order Details</h2>
                      ${orderDetails}
                    </div>
                    <div class="print-section">
                      <h2>Payment Information</h2>
                      ${paymentDetails}
                    </div>
                    <div class="print-section">
                      <h2>Delivery Details</h2>
                      ${deliveryDetails}
                    </div>
                  </body>
                </html>
              `);

              // Trigger print
              printWindow.document.close();
              printWindow.print();
              printWindow.close();
            }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div >
  );
};

export default OrderConfirmationPage;

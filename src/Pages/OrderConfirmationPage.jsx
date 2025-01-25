import { useLocation } from 'react-router-dom';
import { doc, setDoc, collection, addDoc, arrayUnion, getDoc, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from './../firebase/firebaseConfig';
import { useEffect, useState, useRef } from 'react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const [isOrderProcessed, setIsOrderProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  useEffect(() => {
    const createOrderIfNotExists = async () => {
      // Prevent concurrent processing
      if (processingRef.current || isProcessing) {
        console.log('Already processing order, skipping');
        return;
      }

      // Prevent reprocessing of completed orders
      if (isOrderProcessed) {
        console.log('Order already processed in this session, skipping');
        return;
      }

      if (!location.state || !orderId) {
        console.error('No order details or ID found in location state');
        return;
      }

      try {
        // Set processing flags
        setIsProcessing(true);
        processingRef.current = true;

        console.log('Checking for existing order with ID:', orderId);
        
        // First check if order exists in the orders collection
        const ordersCollection = collection(fireDB, 'orders');
        const q = query(ordersCollection, where('orderId', '==', orderId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          console.log('Order already exists in database, skipping creation');
          setIsOrderProcessed(true);
          return;
        }

        // If order doesn't exist, create it
        if (!paymentDetails || !orderDetails || !paymentMethod || !orderStatus) {
          console.error('Missing required order details');
          return;
        }

        console.log('Creating new order with ID:', orderId);

        // Create the order with a new document in the orders collection
        const orderData = {
          paymentDetails,
          orderDetails,
          paymentMethod,
          userId,
          userInfo,
          orderDate,
          orderTime,
          orderStatus,
          orderId,
          createdAt: new Date().toISOString()
        };

        // Add the document to the orders collection
        const newOrderRef = await addDoc(ordersCollection, orderData);
        console.log('Order successfully created with document ID:', newOrderRef.id);

        // Update user's orders array
        if (userId) {
          const userInfoRef = doc(fireDB, 'users', userId);
          await setDoc(userInfoRef, {
            orders: arrayUnion(newOrderRef.id)
          }, { merge: true });
          console.log('User info updated with new order ID');
        }

        setIsOrderProcessed(true);

      } catch (error) {
        console.error('Error in order creation process:', error);
      } finally {
        // Clear processing flags
        setIsProcessing(false);
        processingRef.current = false;
      }
    };

    if (orderId && !isOrderProcessed && !isProcessing) {
      createOrderIfNotExists();
    }
  }, [location.state, orderId, isOrderProcessed, isProcessing]); // Add isProcessing to dependencies

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Thank You for Your Order!</h1>
      
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="mb-4">
        {orderDetails?.items.map((item) => (
          <p key={item.id} className="text-lg">
            {item.title} (Quantity: {item.quantity}) - ₹{item.price}
          </p>
        ))}
      </div>
      <p className="text-xl font-bold">Total Amount: ₹{orderDetails?.total}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Payment Details</h2>
      <p className="text-lg">Payment Method: {paymentDetails?.method}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">User Information</h2>
      <p className="text-lg">Name: {userInfo?.firstName} {userInfo?.lastName}</p>
      <p className="text-lg">Email: {userInfo?.email}</p>
      <p className="text-lg">Phone: {userInfo?.phone}</p>
      <p className="text-lg">Address: {userInfo?.address}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Next Steps</h2>
      <p className="text-lg">You will receive a confirmation email shortly with the details of your order.</p>
    </div>
  );
};

export default OrderConfirmationPage;

import { useLocation } from 'react-router-dom';
import { doc, setDoc, collection, addDoc ,arrayUnion,getDoc,query,where,getDocs} from 'firebase/firestore';
import { fireDB } from './../firebase/firebaseConfig';
import { useEffect } from 'react';
import { useState } from 'react';

const OrderConfirmationPage = () => {
    const location = useLocation();

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
      if (!location.state || !orderId) {
        console.error('No order details or ID found in location state');
        return;
      }

      try {
        // First check if order exists
        const orderRef = collection(fireDB, 'orders');
        const q = query(orderRef, where('orderId', '==', orderId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          console.log('Order already exists, skipping creation');
          return;
        }

        // If order doesn't exist, create it
        if (!paymentDetails || !orderDetails || !paymentMethod || !orderStatus) {
          console.error('Missing required order details');
          return;
        }

        // Create the order
        const newOrderDoc = await addDoc(orderRef, {
          paymentDetails,
          orderDetails,
          paymentMethod,
          userId,
          userInfo,
          orderDate,
          orderTime,
          orderStatus,
          orderId,
          createdAt: new Date().toISOString() // Add timestamp for better tracking
        });
        console.log('Order created with ID:', newOrderDoc.id);

        // Update user's orders array
        const userInfoRef = doc(fireDB, 'users', userId);
        await setDoc(userInfoRef, {
          orders: arrayUnion(newOrderDoc.id)
        }, { merge: true });
        console.log('User info updated with new order ID');

      } catch (error) {
        console.error('Error in order creation process:', error);
      }
    };

    createOrderIfNotExists();
  }, []); // Empty dependency array since we only want this to run once

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

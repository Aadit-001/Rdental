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
    const checkIfOrderExists = async () => {
      if (!orderId) {
        console.error('No order ID found in location state');
        return;
      }

      const orderRef = collection(fireDB, 'orders');
      const q = query(orderRef, where('orderId', '==', orderId));
      const querySnapshot = await getDocs(q);
      const orderDoc = querySnapshot.docs[0];

      if (querySnapshot.size > 0 && querySnapshot.docs[0].data().orderId === orderId) {
        console.log('Order already created, skipping...');
        return; // Prevent duplicate order creation
      }

    const createOrder = async () => {
      if (!paymentDetails || !orderDetails || !paymentMethod || !orderStatus || !orderId) {
        console.error('Missing required order details:', {
          paymentDetails,
          orderDetails,
          paymentMethod,
          orderStatus,
          orderId,
        });
        return;
      }


      try {
        const orderRef = collection(fireDB, 'orders');
        const userInfoRef = doc(fireDB, 'users', userId);

        const orderDoc = await addDoc(orderRef, {
          paymentDetails,
          orderDetails,
          paymentMethod,
          userId,
          userInfo,
          orderDate,
          orderTime,
          orderStatus,
          orderId,
        });
        console.log('Order created with ID:', orderDoc.id);

        await setDoc(userInfoRef, {
          orders: arrayUnion(orderDoc.id),
        }, { merge: true });
        console.log('User info updated with new order ID');
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    if (location.state) {
      createOrder();
    } else {
      console.error('No order details found in location state');
    }
    };

    checkIfOrderExists();
  }, [location.state]);

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

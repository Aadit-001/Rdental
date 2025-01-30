// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const loadScript = (src) => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// };

// const CheckoutFunction = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  // const { product } = location.state || {};

  // useEffect(() => {
  //   if (!product) {
  //     navigate('/'); // Redirect if no product data
  //     return;
  //   }

  //   const loadRazorpay = async () => {
  //     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  //     if (!res) {
  //       alert('Razorpay SDK failed to load. Please check your internet connection.');
  //       return;
  //     }
  //     // Create order immediately when component loads
  //     handlePayment();
  //   };
  //   loadRazorpay();
  // }, [product]);

  const handlePayment = async () => {
    try {
      // if (!product) {
      //   alert("No product details found!");
      //   return;
      // }

      // Convert amount to paise (multiply by 100)
      const amountInPaise = Math.round(product.total*100);

      try {
        // Create order
        const response = await fetch('https://rdental-backend.onrender.com/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInPaise, // Amount to be charged
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        const orderData = await response.json();
        console.log('Order created:', orderData);

        const options = {
          key: "rzp_test_WgkE2ZcqV09BVS",
          amount: amountInPaise.toString(),
          currency: "INR",
          name: "R Dental",
          description: `Payment for ${product.title}`,
          image: "https://example.com/your_logo",
          order_id: orderData.orderId,
          handler: function (response) {
            // Handle successful payment
            alert("Payment Successful!");
            console.log({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
            // You can navigate to a success page or order confirmation page here
            navigate('/order-success', { 
              state: { 
                paymentDetails: response,
                orderDetails: product 
              }
            });
          },
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "8657619320"
          },
          notes: {
            address: "Razorpay Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  // Loading state while Razorpay initializes
  // if (!product) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <div className="checkout-container mt-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>
        <p className="text-gray-600">Please wait while we initialize your payment...</p>
      </div>
    </div>
  );
};

export default CheckoutFunction;
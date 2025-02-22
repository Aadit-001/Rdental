import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, getDoc ,setDoc} from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { useContext } from 'react';
import myContext from '../../context/data/myContext';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';
import UserInfoForm from './userInfoForm';
// import sendEmail from '../../Components/email';
// import axios from 'axios';

const steps = ['Shipping Information', 'Payment Information', 'Review Order'];

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v2/checkout.js';

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script is already in DOM
    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      reject(new Error('Razorpay script loading failed'));
    };

    document.body.appendChild(script);
  });
};

const CheckoutLayout = () => {
  const { setUserInfo,currentUserId} = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayInstance, setRazorpayInstance] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const productRef = doc(fireDB, "products", productId);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          return { id: productDoc.id, ...productDoc.data() };
        }
        return null;
      } catch (error) {
        console.error("Error fetching product:", error);
        return null;
      }
    };

    const initializeOrderDetails = async () => {
      if (!location.state) {
        navigate('/cart');
        return;
      }

      // Handle data from cart page
      if (location.state.cartItems) {
        const { cartItems, orderSummary } = location.state;
        const updatedItems = await Promise.all(
          cartItems.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            return {
              id: item.productId,
              title: productDetails?.title || 'Product',
              quantity: Number(item.quantity),
              price: Number(item.price || 0),
              imageUrl: productDetails?.imageUrl
            };
          })
        );

        setOrderDetails({
          items: updatedItems,
          subtotal: Number(orderSummary.subtotal),
          tax: Number(orderSummary.tax),
          shipping: Number(orderSummary.shipping),
          total: Number(orderSummary.total)
        });
      }
      // Handle data from product detail page
      else if (location.state.product) {
        const { product } = location.state;
        const productDetails = await fetchProductDetails(product.id);
        setOrderDetails({
          items: [{
            id: productDetails?.id || product?.id || product?.productId,
            title: productDetails?.title || product?.title,
            quantity: product.quantity,
            price: Number(product.price),
            imageUrl: productDetails?.imageUrl || product.imageUrl
          }],
          subtotal: Number(product.subtotal),
          tax: Number(product.tax),
          shipping: Number(product.shipping),
          total: Number(product.total)
        });
      }
    };

    const initializeRazorpay = async () => {
      try {
        await loadRazorpayScript();
      } catch (error) {
        toast.error('Failed to initialize payment. Please check your internet connection.');
        console.error('Razorpay initialization error:', error);
      }
    };

    initializeRazorpay();

    initializeOrderDetails();
  }, [location.state, navigate]);

  useEffect(() => {
    // Cleanup Razorpay instance on component unmount
    return () => {
      if (razorpayInstance) {
        razorpayInstance.close();
      }
    };
  }, [razorpayInstance]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'address', 'city', 'pincode', 'phone'];
    const empty = required.filter(field => !formData[field]?.trim());
    
    if (empty.length > 0) {
      toast.error(`Please fill in all required fields`);
      return false;
    }
    
    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    
    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    
    return true;
  };

  const validateOrderDetails = (orderDetails) => {
    if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
      throw new Error('Invalid order details');
    }
  
    // Validate each item
    orderDetails.items.forEach(item => {
      if (!item.id || !item.title || item.quantity <= 0 || item.price < 0) {
        throw new Error('Invalid item in order');
      }
    });
  
    // Validate financial calculations
    const calculatedSubtotal = orderDetails.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
  
    const TOLERANCE = 0.01; // Allow small floating-point discrepancies
    if (Math.abs(calculatedSubtotal - orderDetails.subtotal) > TOLERANCE) {
      throw new Error('Subtotal calculation mismatch');
    }
  };

  const validateUserInformation = (formData) => {
    const validations = [
      { 
        field: 'firstName', 
        validate: (value) => value && value.length >= 2 && value.length <= 50 
      },
      { 
        field: 'lastName', 
        validate: (value) => value && value.length >= 2 && value.length <= 50 
      },
      { 
        field: 'phone', 
        validate: (value) => /^\d{10}$/.test(value) 
      },
      { 
        field: 'pincode', 
        validate: (value) => /^\d{6}$/.test(value) 
      },
      { 
        field: 'address', 
        validate: (value) => value && value.length >= 5 && value.length <= 200 
      }
    ];
  
    const failedValidations = validations.filter(
      validation => !validation.validate(formData[validation.field])
    );
  
    if (failedValidations.length > 0) {
      const errorMessages = failedValidations.map(
        validation => `Invalid ${validation.field}`
      );
      throw new Error(errorMessages.join(', '));
    }
  };
  
  const validatePaymentMethod = (method) => {
    const VALID_METHODS = ['cardOrUpi', 'cod'];
    
    if (!VALID_METHODS.includes(method)) {
      throw new Error('Invalid payment method');
    }
  };

  const handleNext = () => {
    let isValid = true;

    switch (activeStep) {
      case 0:
        isValid = validateShippingInfo();
        break;
      case 1:
        isValid = paymentMethodSelected !== '';
        if (!isValid) {
          toast.error('Please select a payment method');
          return;
        }
        break;
      default:
        break;
    }

    if (!isValid) return;

    if (activeStep === steps.length - 1) {
      handlePayment();
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };




  const handlePayment = async () => {
    if (isProcessing) {
      return;
    }
    
    setIsProcessing(true);
    let orderData = null;

    try {
      validateOrderDetails(orderDetails);
      validateUserInformation(formData);
      validatePaymentMethod(paymentMethodSelected);

      const amountInPaise = Math.round(orderDetails.total*100);
      if (!amountInPaise) {
        toast.error('Amount is not available');
        setIsProcessing(false);
        return;
      }

      const userRef = doc(fireDB, "users", currentUserId);
      const getUserInfo = await getDoc(userRef);

      if (paymentMethodSelected === 'cardOrUpi') {
        //fetch razorpay key id from backend
        const getRazorpayKey = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getRazorpayKey`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // const data = await razorpayKey.json();
        const { razorpayKey } = await getRazorpayKey.json();
        // Create order only if not already created
        if (!orderData) {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createOrder`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: amountInPaise,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to create order');
            }

            orderData = await response.json();
          } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Failed to create order. Please try again.");
            setIsProcessing(false);
            return;
          }
        }

        // Close existing Razorpay instance if any
        if (razorpayInstance) {
          razorpayInstance.close();
        }


        const options = {
          key: razorpayKey,
          amount: amountInPaise.toString(),
          currency: "INR",
          name: "R Dental",
          description: `Payment for ${orderDetails.items.map(item => item.title).join(', ')}`,
          image: '',
          order_id: orderData.orderId,
          handler: function (response) {
            setIsProcessing(false);
            if (response.razorpay_payment_id) {
              navigate('/orderConfirmation', {
                state: {
                  paymentDetails: response,
                  orderDetails: orderDetails,
                  paymentMethod: paymentMethodSelected,
                  userId: currentUserId,
                  userInfo: formData,   //ye karne se address wala issue chala gaya
                  orderDate: new Date().toLocaleDateString(),
                  orderTime: new Date().toLocaleTimeString(),
                  orderStatus: 'processing',
                  orderId: orderData.id
                }
              });
            } else {
              toast.error('Payment failed');
            }


          },
          // handler: async function (response) {
          //   console.log(response);
          //   try {
          //     // Verify payment on the server
          //     const verificationResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify-payment`, {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'application/json',
          //       },
          //       body: JSON.stringify({
          //         razorpay_order_id: orderData.id,
          //         razorpay_payment_id: response.razorpay_payment_id,
          //         razorpay_signature: response.razorpay_signature
          //       })
          //     });
  
          //     const verificationResult = await verificationResponse.json();

          //     console.log(verificationResult);
  
          //     if (verificationResult.status === 'success') {
          //       // Payment verified successfully
          //       setIsProcessing(false);
          //       navigate('/orderConfirmation', {
          //         state: {
          //           paymentDetails: response,
          //           orderDetails: orderDetails,
          //           paymentMethod: paymentMethodSelected,
          //           userId: currentUserId,
          //           userInfo: formData,
          //           orderDate: new Date().toLocaleDateString(),
          //           orderTime: new Date().toLocaleTimeString(),
          //           orderStatus: 'processing',
          //           orderId: orderData.id
          //         }
          //       });
          //     } else {
          //       // Payment verification failed
          //       toast.error('Payment verification failed');
          //       setIsProcessing(false);
          //     }
          //   } catch (verificationError) {
          //     console.error('Payment verification error:', verificationError);
          //     toast.error('Payment verification failed');
          //     setIsProcessing(false);
          //   }
          // },  
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              setRazorpayInstance(null);
            }
          },
          prefill: {
            name: formData.firstName + " " + formData.lastName,
            email: getUserInfo.data().email,
            contact: formData.phone
          },
          notes: {
            address: formData.address
          },
          theme: {
            color: "#3399cc"
          }
        };

        try {
          const rzp = new window.Razorpay(options);
          setRazorpayInstance(rzp);
          
          rzp.on('payment.failed', function (response) {
            setIsProcessing(false);
            setRazorpayInstance(null);
            toast.error(response.error.reason);
          });

          rzp.open();
        } catch (error) {
          console.error("Error initializing Razorpay:", error);
          setIsProcessing(false);
          setRazorpayInstance(null);
          toast.error("Payment initialization failed. Please try again.");
        }

      } else {
        navigate('/orderConfirmation', { 
          state: { 
            paymentDetails: "Cash On Delivery",
            orderDetails: orderDetails,
            paymentMethod: paymentMethodSelected,
            userId: currentUserId,
            userInfo: formData,  //ye karne se address wala issue chala gaya
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
            orderStatus: 'processing',
            orderId: `order_${Date.now()}`
          }
        });
        // sendEmail();
        setIsProcessing(false);
      }
      
      await setDoc(userRef, {
        userInformation: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
          country: "India",
        }
      }, { merge: true });

      setUserInfo(formData);

    } catch (error) {
      console.error('Validation Error:', error);
      setIsProcessing(false);
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
      return;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UserInfoForm
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <PaymentForm 
            payemntMethodSelected={paymentMethodSelected} 
            setPaymentMethodSelected={setPaymentMethodSelected}
          />
        );
      case 2:
        return orderDetails ? <OrderSummary orderDetails={orderDetails} /> : null;
      default:
        return (
          <div className="max-w-lg mx-auto min-h-screen pt-24">
            <div className="border border-gray-300 rounded-lg shadow-md my-6 p-4">
              <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
              </div>
            </div>
          </div>
        );
    }
  };

  if (!orderDetails) {
    return (
      <div className="max-w-lg mx-auto min-h-screen pt-24">
        <div className="border border-gray-300 rounded-lg shadow-md my-6 p-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }


  //better loading screen
  if(isProcessing){
    return(
      <div className="max-w-lg mx-auto min-h-screen pt-24">
        <div className=" my-6 p-4">
          <div className="flex flex-col justify-center items-center min-h-[60vh] ">
            <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full" />
            <p className="ml-4 mt-2 mb-1 text-black">Processing...</p>
            <p className="ml-4 mt-2 mb-1 text-black">Please be patient, we are initializing payment...</p>
            <p className="ml-4 mt-2 mb-1 text-black">This may take a few minutes...</p>
          </div>
        </div>
      </div>
    )
  }

  

  return (
    <div className="max-w-lg mx-auto min-h-screen pt-24">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Checkout</h1>
        <div className="flex mb-12 items-center justify-center space-x-3">
          {steps.map((label) => (
            <div key={label} className="flex items-center flex-col">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  activeStep >= steps.indexOf(label)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              >{steps.indexOf(label)+1}</div>
              {/* <span className="ml-2">{label}</span> */}
            </div>
          ))}
        </div>
        <div>
          {getStepContent(activeStep)}
          <div className="flex justify-end mt-3">
            {activeStep !== 0 && (
              <button onClick={handleBack} className="mr-1 px-4 py-2 bg-gray-300 rounded">
                Back
              </button>
            )}
            <button
              className={`px-4 py-2 rounded ${isProcessing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
              onClick={handleNext}
              disabled={isProcessing}
            >
              {activeStep === steps.length - 1 ? (isProcessing ? 'Processing...' : 'Place Order') : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;

import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import UserInfoForm from './userInfoForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import { toast } from 'react-toastify';
import { doc, getDoc ,setDoc} from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { useContext } from 'react';
import myContext from '../../context/data/myContext';

const steps = ['Shipping Information', 'Payment Information', 'Review Order'];

const loadScript = (src) => {
  // Check if script is already cached in localStorage
  const cachedScript = localStorage.getItem('razorpayScript');
  const cachedTimestamp = localStorage.getItem('razorpayScriptTimestamp');
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // If script is cached and not expired, return cached version
  if (cachedScript && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp)) < cacheExpiry) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    // Check if script is already loaded in DOM
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      // Cache the script and timestamp
      localStorage.setItem('razorpayScript', src);
      localStorage.setItem('razorpayScriptTimestamp', Date.now().toString());
      resolve(true);
    };
    script.onerror = () => {
      localStorage.removeItem('razorpayScript');
      localStorage.removeItem('razorpayScriptTimestamp');
      resolve(false);
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
        console.log(productDetails);
        console.log(product);
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

    const loadRazorpay = async () => {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        toast.error('Razorpay SDK failed to load. Please check your internet connection.');
        return;
      }
    };

    loadRazorpay();

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
      console.log('Payment already processing');
      return;
    }
    
    setIsProcessing(true);
    let orderData = null;

    try {
      const amountInPaise = Math.round(orderDetails.total*100);
      if (!amountInPaise) {
        toast.error('Amount is not available');
        setIsProcessing(false);
        return;
      }

      const userRef = doc(fireDB, "users", currentUserId);
      const getUserInfo = await getDoc(userRef);
      console.log(getUserInfo.data())

      if (paymentMethodSelected === 'cardOrUpi') {
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
            console.log('Order created:', orderData);
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
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
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
                  userInfo: getUserInfo.data().userInformation,
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
            userInfo: getUserInfo.data().userInformation,
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
            orderStatus: 'processing',
            orderId: `order_${Date.now()}`
          }
        });
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

      setUserInfo(getUserInfo.data().userInformation);

    } catch (error) {
      setIsProcessing(false);
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
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
          <Container maxWidth="lg" sx={{ mb: 4 }} className='min-h-screen pt-[9%]'> 
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress /> {/* Display loading spinner */}
          </Box>
        </Paper>
      </Container>
        );
    }
  };

  if (!orderDetails) {
    return (
      <Container maxWidth="lg" sx={{ mb: 4 }} className='min-h-screen pt-[9%]'>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress /> {/* Display loading spinner */}
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }} className='min-h-screen pt-[9%]'>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isProcessing}
            >
              {activeStep === steps.length - 1 ? (isProcessing ? 'Processing...' : 'Place Order') : 'Next'}
            </Button>
          </Box>
        </>
      </Paper>
    </Container>
  );
};

export default CheckoutLayout;

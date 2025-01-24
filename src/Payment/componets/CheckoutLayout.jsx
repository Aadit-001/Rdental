import React, { useState, useEffect } from 'react';
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
import logoo from '../../assets/logoo.png';

const steps = ['Shipping Information', 'Payment Information', 'Review Order'];

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const CheckoutLayout = () => {
  const {userInfo, setUserInfo,currentUserId} = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('');

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
        isValid = true;
        // isValid = validatePaymentInfo();
        break;
      case 2:
        // Final review step, no validation needed
        break;
      default:
        break;
    }

    if (!isValid) return;

    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === steps.length - 1) {
      handlePayment();
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePayment = async () => {
    try {
      const amountInPaise = Math.round(orderDetails.total*100);
      if(!amountInPaise){
        toast.error('Amount is not available');
        return;
      }

      const userRef = doc(fireDB, "users", currentUserId);
      const getUserInfo = await getDoc(userRef);

      if(paymentMethodSelected === 'cardOrUpi'){
        try {
          const response = await fetch('https://rdental-backend.onrender.com/createOrder', {
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
  
          const orderData = await response.json();
          console.log('Order created:', orderData);
  
          const options = {
            key: "rzp_test_WgkE2ZcqV09BVS",
            amount: amountInPaise.toString(),
            currency: "INR",
            name: "R Dental",
            description: `Payment for ${orderDetails.items.map(item => item.title).join(', ')}`,
            image: logoo,
            order_id: orderData.orderId,
            handler: function (response) {

              console.log(response);
              console.log(orderData);

              console.log({
                payment_id: response.razorpay_payment_id,

              });
              if(response.razorpay_payment_id){
              navigate('/orderConfirmation', { 
                state: { 
                  paymentDetails: response,
                  orderDetails: orderDetails,
                  paymentMethod: paymentMethodSelected,
                  userId: currentUserId,
                  userInfo: getUserInfo.data().userInformation,
                  orderDate: new Date().toLocaleDateString(),
                  orderTime: new Date().toLocaleTimeString(),
                  orderStatus: 'processing',  //this needs to be changed to 'processing' once the payment is successful
                  orderId: orderData.id
                }
              });
            }else{
              toast.error('Payment failed');
            }

              // //usr ko email pe confirmation mail send karna hai
              // const mailOptions = {
              //   from: 'rdental@gmail.com',
              //   to: getUserInfo.data().email,
              //   subject: 'Order Confirmation',
              //   text: `Thank you for your order! Your order ID is ${orderData.orderId}. We will process your order and send it to you shortly.`
              // };
              // const sendMail = async (mailOptions) => {
              //   try {
              //     await sendEmail(mailOptions);
              //     toast.success('Email sent successfully');
              //   } catch (error) {
              //     toast.error('Error sending email');
              //   }
              // };
              // await sendMail(mailOptions);
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
  
          const rzp1 = new window.Razorpay(options);
  
          rzp1.on('payment.failed', function (response) {
            toast.error(response.error.reason);
            // navigate('/checkout');

          });

          rzp1.on('closed', function () {
            // Allow background scroll again when modal is closed
            document.body.style.overflow = 'auto';
          });

          rzp1.open();
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Failed to create order. Please try again.");
        }

      }else{
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
      }
      
      
      // navigate('/payment/success');
      
      //this is perfectly working
      await setDoc(userRef,{
        userInformation:{
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
          country: "India",
        }
      }, { merge: true }); // Use merge to avoid overwriting other fields 

      // const getUserInfo = await getDoc(userRef);
      setUserInfo(getUserInfo.data().userInformation);

    } catch (error) {
      console.error('Payment failed:', error);
      navigate('/paymentFailed');
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
        return <OrderSummary orderDetails={orderDetails} />;
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
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </Button>
          </Box>
        </>
      </Paper>
    </Container>
  );
};

export default CheckoutLayout;

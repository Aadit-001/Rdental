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
} from '@mui/material';
import UserInfoForm from './userInfoForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

const CheckoutLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);

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
            id: product.id,
            title: productDetails?.title || product.title,
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

    initializeOrderDetails();
  }, [location.state, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
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

  const validatePaymentInfo = () => {
    if (!paymentData.paymentMethod) {
      toast.error('Please select a payment method');
      return false;
    }

    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.cardNumber?.trim() || 
          !paymentData.expiryDate?.trim() || 
          !paymentData.cvv?.trim()) {
        toast.error('Please fill in all card details');
        return false;
      }
      // Add card validation logic here if needed
    } else if (paymentData.paymentMethod === 'upi') {
      if (!paymentData.upiId?.trim()) {
        toast.error('Please enter UPI ID');
        return false;
      }
      // Add UPI ID validation logic here if needed
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
        isValid = validatePaymentInfo();
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
      // Implement your payment processing logic here
      // For example, integrate with Razorpay or other payment gateway
      
      // On successful payment
      navigate('/payment/success');
    } catch (error) {
      console.error('Payment failed:', error);
      navigate('/payment/failure');
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
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        );
      case 2:
        return orderDetails ? <OrderSummary orderDetails={orderDetails} /> : null;
      default:
        throw new Error('Unknown step');
    }
  };

  if (!orderDetails) {
    return null; // or a loading spinner
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

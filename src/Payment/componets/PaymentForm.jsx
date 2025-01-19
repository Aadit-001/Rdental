import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

const PaymentForm = ({ onSubmit, paymentData, setPaymentData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="card" 
                control={<Radio />} 
                label="Credit/Debit Card" 
              />
              <FormControlLabel 
                value="upi" 
                control={<Radio />} 
                label="UPI" 
              />
              <FormControlLabel 
                value="cod" 
                control={<Radio />} 
                label="Cash on Delivery" 
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {paymentData.paymentMethod === 'card' && (
          <>
            <Grid item xs={12}>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                fullWidth
                value={paymentData.cardNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="expiryDate"
                name="expiryDate"
                label="Expiry Date"
                fullWidth
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cvv"
                name="cvv"
                label="CVV"
                type="password"
                fullWidth
                value={paymentData.cvv}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}

        {paymentData.paymentMethod === 'upi' && (
          <Grid item xs={12}>
            <TextField
              required
              id="upiId"
              name="upiId"
              label="UPI ID"
              fullWidth
              placeholder="example@upi"
              value={paymentData.upiId}
              onChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PaymentForm;

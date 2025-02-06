import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const ShippingAndDelivery = () => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 10, md: 14 },
        px: { xs: 4, sm: 3, md: 'auto' }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.8rem', sm: '2.125rem' }
            }}
          >
            Shipping and Delivery
          </Typography>

          <Typography variant="body1" paragraph>
            For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.
          </Typography>

          <Typography variant="body1" paragraph>
            Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. R DENTAL is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days rom the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
          </Typography>

          <Typography variant="body1" paragraph>
            Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
          </Typography>

          <Typography variant="body1" paragraph>
            For any issues in utilizing our services you may contact our helpdesk on 9619653896 or rdental96@gmail.com
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
          >
            Last updated: February 6, 2025
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShippingAndDelivery;

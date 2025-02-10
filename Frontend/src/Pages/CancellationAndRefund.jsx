import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const CancellationAndRefund = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 14 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
          Cancellation and Refund Policy
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography paragraph>
            R DENTAL believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
          </Typography>
          <Typography paragraph>
            Cancellations will be considered only if the request is made within 2-3 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
          </Typography>
          <Typography paragraph>
            R DENTAL does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
          </Typography>
          <Typography paragraph>
            In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 2-3 days of receipt of the products.
          </Typography>
          <Typography paragraph>
            In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2-3 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
          </Typography>
          <Typography paragraph>
            In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
          </Typography>
          <Typography paragraph>
            In case of any Refunds approved by the R DENTAL, it’ll take 3-5 days for the refund to be processed to the end customer.
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Last updated: February 6, 2025
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CancellationAndRefund;
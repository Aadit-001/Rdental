import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  ErrorOutline,
} from '@mui/material';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <ErrorOutline sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We're sorry, but there was an error processing your payment.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Please try again or contact our support team if the problem persists.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/checkout')}
            sx={{ mr: 2 }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentFailure;

import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Grid,
  Avatar,
  Paper
} from '@mui/material';

const OrderSummary = ({ orderDetails }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {orderDetails.items.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <Avatar 
              src={item.imageUrl} 
              variant="square"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <ListItemText
              primary={item.title}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">₹{(item.price * item.quantity).toFixed(2)}</Typography>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1">
            ₹{orderDetails.subtotal.toFixed(2)}
          </Typography>
        </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" />
          <Typography variant="subtitle1">
            ₹{orderDetails.shipping.toFixed(2)}
          </Typography>
        </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tax" />
          <Typography variant="subtitle1">
            ₹{orderDetails.tax.toFixed(2)}
          </Typography>
        </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹{orderDetails.total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Shipping Method: Standard Delivery (3-5 business days)
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderSummary;

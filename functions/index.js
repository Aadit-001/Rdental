import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import functions from 'firebase-functions';

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "*"
}));
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: 'rzp_test_WgkE2ZcqV09BVS',
  key_secret: 'YySoAmLnEBvTWlj2sv11a5f8',
});

// Create Razorpay order endpoint
app.post('/createOrder', async (req, res) => {
  try {
    const { amount } = req.body; // Get amount from request body
    const options = {
      amount: amount, // Amount in smallest currency unit (e.g., paise)
      currency: 'INR',
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order); // Send the order details back to the client
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Failed to create order");
  }
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default functions.https.onRequest(app);
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  SvgIcon
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/Money';

const PaymentForm = ({ paymentMethodSelected, setPaymentMethodSelected }) => {
  const handleChange = (e) => {
    setPaymentMethodSelected(e.target.value);
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
              value={paymentMethodSelected}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="cod" 
                control={<Radio />} 
                label="Cash on Delivery" 
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <SvgIcon component={MoneyIcon} inheritViewBox />
              </FormControlLabel>
              <FormControlLabel 
                value="cardOrUpi" 
                control={<Radio />} 
                label="Card/UPI" 
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <SvgIcon component={CreditCardIcon} inheritViewBox />
              </FormControlLabel>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

PaymentForm.propTypes = {
  paymentMethodSelected: PropTypes.string,
  setPaymentMethodSelected: PropTypes.func.isRequired,
};

export default PaymentForm;

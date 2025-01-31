import {
  Grid,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const UserInfoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address"
          name="address"
          label="Address"
          fullWidth
          variant="outlined"
          value={formData.address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          variant="outlined"
          value={formData.city}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="state"
          name="state"
          label="State"
          fullWidth
          variant="outlined"
          value={formData.state}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="pincode"
          name="pincode"
          label="PIN Code"
          fullWidth
          variant="outlined"
          value={formData.pincode}
          onChange={handleChange}
          inputProps={{ maxLength: 6 }}
          helperText="Enter 6-digit PIN code"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="phone"
          name="phone"
          label="Phone Number"
          fullWidth
          variant="outlined"
          value={formData.phone}
          onChange={handleChange}
          inputProps={{ maxLength: 10 }}
          helperText="Enter 10-digit phone number"
        />
      </Grid>
    </Grid>
  );
};

UserInfoForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired
};

export default UserInfoForm;
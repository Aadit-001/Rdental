import React, { useState, useEffect } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Admin() {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Fetch products
    setProducts([
      { id: 1, name: 'Product 1', description: 'Description 1', price: 99.99, category: 'Category 1' },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 149.99, category: 'Category 2' },
    ]);

    // Fetch users
    setUsers([
      { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Customer' },
      { id: 2, name: 'User 2', email: 'user2@example.com', role: 'Admin' },
    ]);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenProductDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setProductForm(product);
    } else {
      setSelectedProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
    }
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    setSelectedProduct(null);
  };

  const handleProductFormChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSubmit = () => {
    // Implement product creation/update logic here
    console.log('Product form submitted:', productForm);
    handleCloseProductDialog();
  };

  const handleDeleteProduct = (productId) => {
    // Implement product deletion logic here
    console.log('Delete product:', productId);
  };

  const handleDeleteUser = (userId) => {
    // Implement user deletion logic here
    console.log('Delete user:', userId);
  };

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Products" />
          <Tab label="Users" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenProductDialog()}
          >
            Add New Product
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenProductDialog(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Product Dialog */}
      <Dialog open={openProductDialog} onClose={handleCloseProductDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Product Name"
                fullWidth
                value={productForm.name}
                onChange={handleProductFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={productForm.description}
                onChange={handleProductFormChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={productForm.price}
                onChange={handleProductFormChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="category"
                label="Category"
                fullWidth
                value={productForm.category}
                onChange={handleProductFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                label="Image URL"
                fullWidth
                value={productForm.imageUrl}
                onChange={handleProductFormChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductDialog}>Cancel</Button>
          <Button onClick={handleProductSubmit} variant="contained">
            {selectedProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

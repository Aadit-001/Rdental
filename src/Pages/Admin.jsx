import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      className={`${value !== index ? 'hidden' : ''}`}
    >
      {value === index && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    setProducts([
      { id: 1, srNo: 1, img: '/product1.jpg', title: 'Product 1', price: 99.99, category: 'Category 1', date: '2023-11-01' },
      { id: 2, srNo: 2, img: '/product2.jpg', title: 'Product 2', price: 149.99, category: 'Category 2', date: '2023-11-02' },
    ]);

    setUsers([
      { id: 1, srNo: 1, name: 'User 1', email: 'user1@example.com', phoneNo: '1234567890', date: '2023-01-15' },
      { id: 2, srNo: 2, name: 'User 2', email: 'user2@example.com', phoneNo: '0987654321', date: '2023-02-20' },
    ]);

    setOrders([
      { 
        id: 1, 
        srNo: 1,
        img: '/product1.jpg',
        title: 'Product 1',
        totalPrice: 299.99,
        category: 'Category 1',
        name: 'John Doe',
        address: '123 Main St',
        pincode: '12345',
        phoneNo: '1234567890',
        email: 'john@example.com',
        date: '2023-11-01',
        status: 'Delivered',
        paymentId: 'PAY123',
        orderId: 'ORD123'
      },
      {
        id: 2,
        srNo: 2, 
        img: '/product2.jpg',
        title: 'Product 2',
        totalPrice: 199.99,
        category: 'Category 2', 
        name: 'Jane Smith',
        address: '456 Oak St',
        pincode: '67890',
        phoneNo: '0987654321',
        email: 'jane@example.com',
        date: '2023-11-02',
        status: 'Processing',
        paymentId: 'PAY456',
        orderId: 'ORD456'
      },
    ]);
  }, []);

  const stats = {
    totalProducts: products.length,
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalPrice, 0),
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleOpenProductDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setProductForm(product);
    } else {
      setSelectedProduct(null);
      setProductForm({
        title: '',
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
    console.log('Product form submitted:', productForm);
    handleCloseProductDialog();
  };

  const handleDeleteProduct = (productId) => {
    console.log('Delete product:', productId);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
              </div>
              <FiPackage className="text-3xl text-green-500" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
              <FiUsers className="text-3xl text-blue-500" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
              <FiShoppingCart className="text-3xl text-purple-500" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</h3>
              </div>
              <FiDollarSign className="text-3xl text-yellow-500" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-6 py-3 ${tabValue === 0 ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
                onClick={() => handleTabChange(0)}
              >
                Products
              </button>
              <button
                className={`px-6 py-3 ${tabValue === 1 ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
                onClick={() => handleTabChange(1)}
              >
                Users
              </button>
              <button
                className={`px-6 py-3 ${tabValue === 2 ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
                onClick={() => handleTabChange(2)}
              >
                Orders
              </button>
            </div>
          </div>

          <TabPanel value={tabValue} index={0}>
            <div className="mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => handleOpenProductDialog()}
              >
                <FiPlus />
                Add New Product
              </motion.button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4">{product.srNo}</td>
                      <td className="px-6 py-4">
                        <img src={product.img} alt={product.title} className="h-12 w-12 object-cover rounded" />
                      </td>
                      <td className="px-6 py-4">{product.title}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">{product.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-500"
                            onClick={() => handleOpenProductDialog(product)}
                          >
                            <FiEdit />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-500"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <FiTrash2 />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4">{user.srNo}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phoneNo}</td>
                      <td className="px-6 py-4">{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4">{order.srNo}</td>
                      <td className="px-6 py-4">
                        <img src={order.img} alt={order.title} className="h-12 w-12 object-cover rounded" />
                      </td>
                      <td className="px-6 py-4">{order.title}</td>
                      <td className="px-6 py-4">${order.totalPrice}</td>
                      <td className="px-6 py-4">{order.category}</td>
                      <td className="px-6 py-4">{order.name}</td>
                      <td className="px-6 py-4">{order.address}</td>
                      <td className="px-6 py-4">{order.pincode}</td>
                      <td className="px-6 py-4">{order.phoneNo}</td>
                      <td className="px-6 py-4">{order.email}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{order.paymentId}</td>
                      <td className="px-6 py-4">{order.orderId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </div>
      </div>

      {/* Product Dialog */}
      {openProductDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  name="title"
                  placeholder="Product Title"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={productForm.title}
                  onChange={handleProductFormChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                />
                <input
                  name="category"
                  placeholder="Category"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={productForm.category}
                  onChange={handleProductFormChange}
                />
              </div>
              <div>
                <input
                  name="imageUrl"
                  placeholder="Image URL"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={productForm.imageUrl}
                  onChange={handleProductFormChange}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={handleCloseProductDialog}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleProductSubmit}
              >
                {selectedProduct ? 'Update' : 'Create'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

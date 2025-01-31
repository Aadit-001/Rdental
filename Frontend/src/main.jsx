import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyState from "./context/data/myState.jsx";
import "./index.css";
import Home from "./Home.jsx";
import AboutUs from "./Pages/aboutUs.jsx";
import RootLayout from "./RootLayout.jsx";
import SpecificCatagoryPage from "./Pages/specificCatagoryPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import Cart from "./Pages/Cart.jsx";
import WishList from "./Pages/WishList.jsx";
import ContactUs from "./Components/contactUs.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import PageNotFound from "./ErrorPage/PageNotFound.jsx";
import { ProtectedRouteForUser, ProtectedRouteForAdmin } from "./ProtectedRoute/ProtectedRoute.jsx";
import ForgetPassword from "./Components/ForgetPassword.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import DashboardOverview from "./admin/components/DashboardOverview.jsx";
import Orders from "./admin/components/Orders.jsx";
import Users from "./admin/components/Users.jsx";
import ManageProducts from "./admin/components/ManageProducts.jsx";
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AddProduct from "./admin/components/AddProduct.jsx";
import MyOrders from "./User/myOrders.jsx";
import AddCatagory from "./admin/components/AddCatagory.jsx";
// import CheckoutLayout from "./Pages/CheckoutFunction.jsx";
import ScrollToTop from "./Components/ScrollToTop";
import Messages from "./admin/components/Messages.jsx";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage.jsx";
import PaymentFailed from "./Payment/componets/PaymentFailed.jsx";
import CheckoutLayout from './Payment/componets/CheckoutLayout.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MyState>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="products/:category" element={<SpecificCatagoryPage />} />
              <Route path="products/:category/:productId" element={<ProductDetailPage />} />
              <Route
                path="cart"
                element={
                  <ProtectedRouteForUser>
                    <Cart />
                  </ProtectedRouteForUser>
                }
              />
              <Route
                path="myOrders"
                element={
                  <ProtectedRouteForUser>
                    <MyOrders />
                  </ProtectedRouteForUser>
                }
              />
              <Route
                path="wishlist"
                element={
                  <ProtectedRouteForUser>
                    <WishList />
                  </ProtectedRouteForUser>
                }
              />
              <Route path="contactUs" element={<ContactUs />} />
              <Route path="forgetPassword" element={<ForgetPassword />} />
              <Route
                path="adminPage"
                element={
                  <ProtectedRouteForAdmin>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                  </ProtectedRouteForAdmin>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="add-category" element={<AddCatagory />} />
                <Route path="products" element={<ManageProducts />} />
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
                  <Route path="messages" element={<Messages />} />
              </Route>
              <Route path="checkout" element={
                <ProtectedRouteForUser>
                <CheckoutLayout /> 
                </ProtectedRouteForUser>
              } />
              <Route path="orderConfirmation" element={<OrderConfirmationPage />} />
              <Route path="paymentFailed" element={<PaymentFailed />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer transition={Bounce} />
      </MyState>
    </Provider>
  </StrictMode>
);

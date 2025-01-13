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
import DashboardOverview from "./Admin/components/DashboardOverview.jsx";
import Orders from "./Admin/components/Orders.jsx";
import Users from "./Admin/components/Users.jsx";
import ManageProducts from "./Admin/components/ManageProducts.jsx";
import AdminLayout from "./Admin/components/AdminLayout.jsx";
import AddProduct from "./Admin/components/AddProduct.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="products/:category" element={<SpecificCatagoryPage />} />
            <Route path="products/:category/:title" element={<ProductDetailPage />} />
            <Route
              path="cart"
              element={
                <ProtectedRouteForUser>
                  <Cart />
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
                // <ProtectedRouteForAdmin>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
                // </ProtectedRouteForAdmin>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer transition={Bounce} />
    </MyState>
  </StrictMode>
);
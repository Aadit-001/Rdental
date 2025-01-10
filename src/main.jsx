import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
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
import Profile from "./Pages/profile.jsx";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import PageNotFound from "./ErrorPage/PageNotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyState>
      {" "}
      {/* state ke andar use kare */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route
                path="/products/:category"
                element={<SpecificCatagoryPage />}
              />
              <Route
                path="/products/:category/:title"
                element={<ProductDetailPage />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </MyState>
  </StrictMode>
);

//protected routes

//user
export const ProtectedRouteForUser = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return;
  }
};

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user")); //string mai aate data ko object mai lene ke liye json.parse
  if (admin && admin.user.email === "aaditjha8657@gmail.com") {
    //keep this in env file
    return children;
  } else {
    return;
  }
};

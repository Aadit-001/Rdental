import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import AboutUs from './Pages/aboutUs.jsx'
import Login from './Pages/login.jsx'
import SignUp from './Pages/signUp.jsx'
import RootLayout from './RootLayout.jsx'
import SpecificCatagoryPage from './Pages/specificCatagoryPage.jsx'
import ProductDetailPage from './Pages/ProductDetailPage.jsx'
import Cart from './Pages/Cart.jsx'
import WishList from './Pages/WishList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} /> 
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/products/:category" element={<SpecificCatagoryPage />} />
          <Route path="/products/:category/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

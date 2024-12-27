import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import AboutUs from './Pages/aboutUs.jsx'
import Login from './Pages/login.jsx'
import SignUp from './Pages/signUp.jsx'
import RootLayout from './RootLayout.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} /> 
          <Route path="/aboutUs" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

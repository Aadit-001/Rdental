import { Outlet } from 'react-router-dom'
import Navbar from './Components/navbar.jsx'
import Footer from './Components/footer.jsx'

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
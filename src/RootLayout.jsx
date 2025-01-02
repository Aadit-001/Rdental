import { Outlet } from 'react-router-dom'
import Navbar from './Components/navbar.jsx'
import Footer from './Components/footer.jsx'
import Login from './Components/login.jsx'
import Signup from './Components/signup.jsx'
// import Profile from './Components/profile.jsx'

function RootLayout() {
  return (
    <>
    {/* kabhi bhi agar koi bhi page ko like login page ko agar pure app mai show karna hai har ek screen pe tph usko rootlayout mai rakhne ka aur uss chiz ke bahar wale div ko flex deke, bg-black/50 taki backgroung blak ho jaye and backdrop blur kar dene ka and wo pura black screen dikhe scrool pe bi toh usko "fixed" kar dene ka with top-0*/}
      <Navbar />
      {/* <Profile /> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
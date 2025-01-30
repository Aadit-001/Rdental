import { Outlet } from 'react-router-dom'
import Navbar from './Components/navbar.jsx'
import Footer from './Components/footer.jsx'
import Login from './Components/login.jsx'
import Signup from './Components/signup.jsx'
import Profile from './User/profile.jsx'
import myContext from './context/data/myContext';
import { useContext, useEffect } from 'react'

function RootLayout() {
  const { showSignIn, showSignUp , setShowSignIn, setShowSignUp, showProfile, setShowProfile ,isUserLoggedIn, setIsUserLoggedIn} = useContext(myContext);  


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [setIsUserLoggedIn]);

  return (
    <>

    {/* kabhi bhi agar koi bhi page ko like login page ko agar pure app mai show karna hai har ek screen pe toh usko 
    rootlayout mai rakhne ka aur uss chiz ke bahar wale div ko flex deke, bg-black/50 taki backgroung blak ho jaye
     and backdrop blur kar dene ka and wo pura black screen dikhe scroll pe bhi toh usko "fixed" kar dene ka with top-0*/}
      <Navbar />
      {showSignIn && <Login />}
      {showSignUp && <Signup />}
      {isUserLoggedIn && showProfile ? <Profile/> : null}
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
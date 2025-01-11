import { Outlet } from 'react-router-dom'
import Navbar from './Components/navbar.jsx'
import Footer from './Components/footer.jsx'
import Login from './Components/login.jsx'
import Signup from './Components/signup.jsx'
import Profile from './Pages/profile.jsx'
import myContext from './context/data/myContext';
import { useContext } from 'react'

function RootLayout() {
  const { showSignIn, showSignUp , setShowSignIn, setShowSignUp, showProfile, setShowProfile ,isUserLoggedIn} = useContext(myContext);


  return (
    <>
    {/* kabhi bhi agar koi bhi page ko like login page ko agar pure app mai show karna hai har ek screen pe toh usko 
    rootlayout mai rakhne ka aur uss chiz ke bahar wale div ko flex deke, bg-black/50 taki backgroung blak ho jaye
     and backdrop blur kar dene ka and wo pura black screen dikhe scroll pe bhi toh usko "fixed" kar dene ka with top-0*/}
      <Navbar setShowSignIn={setShowSignIn} setShowProfile={setShowProfile} showProfile={showProfile}/>
      {showSignIn && <Login setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp}/>}
      {showSignUp && <Signup setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn}/>}
      {isUserLoggedIn && showProfile ? <Profile/> : null}
      <Outlet setShowProfile={setShowProfile} showProfile={showProfile}/>
      <Footer />
    </>
  )
}

export default RootLayout
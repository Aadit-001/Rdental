import myContext from '../context/data/myContext.jsx';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//protected route is liye use kar rahe hai taki jab koi banda direct url mai changes kare toh wo url ke through waha na pahuch jaye
//toh isliye hame protrected route bhi karna hai and navbar pe bhi use karna hia
const ProtectedRouteForUser = ({ children }) => {
    const { setShowSignIn, isUserLoggedIn } = useContext(myContext);
    
    if (isUserLoggedIn) {
      return children;
    } else {
      setShowSignIn(true);
      return <Navigate to="/" />; 
    }
}
  
const ProtectedRouteForAdmin = ({ children }) => {
    // const { setShowSignIn } = useContext(myContext);
    const admin = JSON.parse(localStorage.getItem('user'));
    
    if (admin?.user?.email === 'aaditjha8657@gmail.com' || admin?.user?.email === 'kaifs1391@gmail.com' || admin?.user?.email === 'aadit.jha22@spit.ac.in') {
      return children;
    } else {
      // setShowSignIn(true);
      alert('You are not authorized to access this page');
      toast.error('You are not authorized to access this page', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return <Navigate to="/" />; 
    }
}

export {ProtectedRouteForUser, ProtectedRouteForAdmin}
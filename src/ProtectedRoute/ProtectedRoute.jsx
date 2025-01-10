import myContext from '../context/data/myContext.jsx';
import { useContext } from 'react';


//protected route is liye use kar rahe hai taki jab koi banda direct url mai changes kare toh wo url ke through waha na pahuch jaye
//toh isliye hame protrected route bhi karna hai and navbar pe bhi use karna hia
const ProtectedRouteForUser = ({ children }) => {
    const { setShowSignIn } = useContext(myContext);
    const user = localStorage.getItem('user');
    if (user) {
      return children;
    } else {
      setShowSignIn(true);
      return null;
    }
}
  
  const ProtectedRouteForAdmin = ({ children }) => {
    const { setShowSignIn } = useContext(myContext);
    const admin = JSON.parse(localStorage.getItem('user'));
    if (admin?.user?.email === 'aaditjha8657@gmail.com') {
      return children;
    } else {
      setShowSignIn(true);
      return null;
    }
}

export {ProtectedRouteForUser,ProtectedRouteForAdmin}
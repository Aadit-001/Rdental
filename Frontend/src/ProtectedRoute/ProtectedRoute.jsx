/* eslint-disable react/prop-types */
import myContext from '../context/data/myContext.jsx';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

//protected route is liye use kar rahe hai taki jab koi banda direct url mai changes kare toh wo url ke through waha na pahuch jaye
//toh isliye hame protrected route bhi karna hai and navbar pe bhi use karna hia
const ProtectedRouteForUser = ({ children }) => {
    const { setShowSignIn, isUserLoggedIn } = useContext(myContext);
    const location = useLocation();
    
    if (!isUserLoggedIn) {
        // Only show sign in once when redirecting
        if (location.pathname !== '/') {
            setShowSignIn(true);
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
  
const ProtectedRouteForAdmin = ({ children }) => {
    const location = useLocation();
    const admin = JSON.parse(localStorage.getItem('user'));
    
    if (admin?.email === import.meta.env.VITE_ADMIN_EMAIL1 || admin?.email === import.meta.env.VITE_ADMIN_EMAIL2 || admin?.email === import.meta.env.VITE_ADMIN_EMAIL3) {
        return children;
    }

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
    
    return <Navigate to="/" state={{ from: location }} replace />; 
}

export {ProtectedRouteForUser, ProtectedRouteForAdmin}
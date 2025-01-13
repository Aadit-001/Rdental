import { useState, useEffect } from 'react';
import myContext from './myContext';
import PropTypes from 'prop-types';

const demoProducts = [
    {
        id: 1,
        title: "Digital X-Ray Sensor",
        description: "High-resolution digital dental X-ray sensor with USB connectivity",
        price: 24999,
        mrp: 29999,
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80",
        catagory: "Equipment",
        rating: 4.5
    },
    {
        id: 2,
        title: "Dental Composite Kit",
        description: "Professional light-cure composite restoration kit",
        price: 3999,
        mrp: 4999,
        image: "https://images.unsplash.com/photo-1615916732335-95d99bcd5bd6?q=80",
        catagory: "Restoratives",
        rating: 4.8
    },
    {
        id: 3,
        title: "Autoclave Sterilizer",
        description: "18L Class B autoclave sterilizer with LCD display",
        price: 89999,
        mrp: 99999,
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80",
        catagory: "Sterilization",
        rating: 4.7
    },
    {
        id: 4,
        title: "Root Canal Files Set",
        description: "Complete set of endodontic files for root canal treatment",
        price: 1999,
        mrp: 2499,
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80",
        catagory: "Endodontics",
        rating: 4.6
    }
];

const MyState = (props) => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('light');
    const [product, setProduct] = useState(demoProducts);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsUserLoggedIn(true);
        }
    },[]);

    return (
        <myContext.Provider value={{
            showSignIn,
            showSignUp, 
            setShowSignIn, 
            setShowSignUp,
            showProfile,
            setShowProfile,
            isUserLoggedIn,
            setIsUserLoggedIn,
            isLoading,
            setIsLoading,
            mode,
            setMode,
            product,
            setProduct
        }}>
            {props.children}
        </myContext.Provider>
    )
}

MyState.propTypes = {
    children: PropTypes.node.isRequired
}

export default MyState;

import myContext from './myContext';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyState = (props) => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check localStorage and update state
        const user = localStorage.getItem('user');
        setIsUserLoggedIn(!!user);
        setIsLoading(false);
    }, []); // Only run once on mount

    return (
        <myContext.Provider value={
            {
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
            }}>
            {props.children}
        </myContext.Provider>
    )
}

MyState.propTypes = {
    children: PropTypes.node.isRequired
}

export default MyState;
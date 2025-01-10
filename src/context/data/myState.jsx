import myContext from './myContext';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyState = (props) => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsUserLoggedIn(true);
        }
    },[]);

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
            }}>
            {props.children}
        </myContext.Provider>
    )
}

MyState.propTypes = {
    children: PropTypes.node.isRequired
}

export default MyState;
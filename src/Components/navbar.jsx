import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logoo from '../assets/logoo.png';
import name from '../assets/name.png';
import myContext from '../context/data/myContext';
import { useContext } from 'react';


const Navbar = () => {
  const { setShowSignIn, setShowProfile, showProfile, isUserLoggedIn } = useContext(myContext); // Destructure setShowSignIn from context

  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  // const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const removeProfile = () => {
    if (showProfile) {
      setShowProfile(false);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate to it first
      window.location.href = '/';
    } else {
      // If we're already on the home page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 " onClick={removeProfile}>
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-0 pl-3" onClick={handleLogoClick}>
              <img src={Logoo} alt="R-Dental" className="h-14 w-14" />
              <img src={name} alt="R-Dental" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search products..."
              />
              <div className="absolute left-3 top-2.5">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4 pr-3">
            {/* Admin Link */}
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-800 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            >
              <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                <svg
                  className={`h-8 w-8 ${location.pathname === '/dashboard' ? 'text-green-500 fill-current' : ''}`}
                  fill={location.pathname === '/dashboard' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
            </Link>
            {/* Sign In Button */}
            {
              isUserLoggedIn ? null : 
                <button className="px-6 py-2 font-medium text-green-600 border-2 border-green-500 rounded-lg 
                bg-gradient-to-r from-transparent to-transparent hover:from-green-500 hover:to-green-600 
               hover:text-white transition-all duration-300 ease-in-out
                bg-[length:200%_100%] bg-right hover:bg-left" onClick={handleSignInClick}>
                  Sign In
                </button>
            }
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-gray-800 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            >
              <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                <svg
                  className={`h-6 w-6 ${location.pathname === '/wishlist' ? 'text-green-500 fill-current' : ''}`}
                  fill={location.pathname === '/wishlist' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-800 group">
              <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                <svg
                  className={`h-6 w-6 ${location.pathname === '/cart' ? 'text-green-500 fill-current' : ''}`}
                  fill={location.pathname === '/cart' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </Link>

            {isUserLoggedIn ? 
            <Link className="text-gray-600 hover:text-gray-800 group" onClick={handleProfileClick}>
              <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                <svg
                  className={`h-6 w-6 ${showProfile ? 'text-green-500 fill-current' : ''}`}
                  fill={showProfile ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </Link>  : null }

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logoo from '../assets/logoo.png';
import name from '../assets/name.png';
import myContext from '../context/data/myContext';
import { useContext } from 'react';


const Navbar = () => {

  // const isMobile = useMediaQuery('(max-width:768px)');
  const { setShowSignIn, setShowProfile, showProfile, isUserLoggedIn, searchResults, handleSearch, user, setCurrentProductId } = useContext(myContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

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
      window.location.href = '/';
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
          <div className="flex-1 max-w-2xl mx-auto px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full px-4 py-2 pl-10 pr-12 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <div className="absolute w-full bg-white mt-1 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setSearchQuery('');
                          navigate(`/products/${product.category}/${product.id}`);
                          setCurrentProductId(product.id);
                        }}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          <img src={product.imageUrl} alt={product.title} className="w-12 h-12 object-cover rounded" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-500">No products found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4 pr-3">
            {/* Admin Link */}
            {
              isUserLoggedIn && ((user?.email === import.meta.env.VITE_ADMIN_EMAIL1 || user?.email === import.meta.env.VITE_ADMIN_EMAIL2 || user?.email === import.meta.env.VITE_ADMIN_EMAIL3) || 
              (JSON.parse(localStorage.getItem('user'))?.email === import.meta.env.VITE_ADMIN_EMAIL1 || 
               JSON.parse(localStorage.getItem('user'))?.email === import.meta.env.VITE_ADMIN_EMAIL2 || 
               JSON.parse(localStorage.getItem('user'))?.email === import.meta.env.VITE_ADMIN_EMAIL3)) ?

                <Link
                  to="/adminPage"
                  className="text-gray-600 hover:text-gray-800 group"
                  onClick={scrollToTop}
                >
                  <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className={`h-8 w-8 ${location.pathname === '/AdminDashboard' ? 'text-green-500 fill-current' : ''}`}
                      fill={location.pathname === '/AdminDashboard' ? 'currentColor' : 'none'}
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
                </Link> : null

            }


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
              onClick={scrollToTop}
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
            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-800 group"
              onClick={scrollToTop}
            >
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
              </Link> : null}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

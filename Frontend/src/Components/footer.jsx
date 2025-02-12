import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4"><span className='text-green-500'>R</span>-DENTAL</h3>
            <p className="text-gray-400">
              Your trusted partner in dental supplies. Providing quality dental products 
              and equipment to dental professionals since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
              {/* <li><Link to="/products" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Products</Link></li> */}
              <li><Link to="/aboutUs" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</Link></li>
              <li><Link to="/contactUs" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact Us</Link></li>
              <li><Link to="/Cart" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Information & Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
               <li><Link to="/termsAndCondition" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Terms And Conditions</Link></li>
              <li><Link to="/shippingAndDelivery" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shipping Policy</Link></li>
              <li><Link to="/cancellationAndRefund" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Cancellation and Refund</Link></li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Dashboard</Link></li>
              <li><Link to="/myOrders" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>My Orders</Link></li>
              <li><Link to="/wishlist" className="text-gray-400 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Wishlist</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: <a href="mailto:rdental96@gmail.com" className="hover:text-white">rdental96@gmail.com</a></p>
              <p>Phone: +91 961 965 3896</p>
              <p className="pl-[56px]"> +91 937 281 7043</p>
              <p>Address: Shop no.16, 1st floor, Veer Hanuman Nagar Rd, opp.RBI quarter, Kandarpada, Dahisar West, Mumbai, Maharashtra 400068</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-1">
          <h4 className="text-xl font-semibold mb-4">Payment Methods We Accept</h4>
          <div className="flex items-center space-x-4">
            <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-12" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/800px-Rupay-Logo.png" alt="RuPay" className="h-12" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8" />
            <img src="https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png" alt="Paytm" className="h-12" />
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/2560px-Google_Pay_Logo_%282020%29.svg.png" alt="Google Pay" className="h-8" /> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="text-green-500">R</span>-DENTAL. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a 
                href="https://www.facebook.com/share/15JxAxWXZh/?mibextid=qi2Omg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/919619653896"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.472 3.727C18.208 1.464 15.208 0.193 12.033 0.192C5.465 0.192 0.127 5.53 0.125 12.098C0.124 14.212 0.667 16.272 1.7 18.088L0.181 24L6.224 22.514C7.963 23.439 9.902 23.927 11.877 23.928H11.883C18.45 23.928 23.79 18.589 23.792 12.021C23.793 8.847 22.525 5.847 20.262 3.583L20.472 3.727ZM12.033 21.925H12.028C10.264 21.925 8.535 21.463 6.999 20.587L6.638 20.373L2.897 21.355L3.895 17.707L3.66 17.333C2.698 15.733 2.19 13.888 2.191 11.998C2.192 6.634 6.669 2.157 12.037 2.157C14.677 2.157 17.157 3.185 19.023 5.052C20.888 6.919 21.914 9.399 21.913 12.039C21.911 17.404 17.397 21.917 12.033 21.925ZM17.472 14.382C17.175 14.233 15.714 13.515 15.442 13.415C15.17 13.316 14.972 13.267 14.773 13.565C14.576 13.862 14.006 14.531 13.833 14.729C13.66 14.928 13.486 14.952 13.189 14.804C12.892 14.654 11.934 14.341 10.799 13.329C9.916 12.541 9.319 11.568 9.146 11.27C8.973 10.973 9.128 10.812 9.276 10.664C9.41 10.531 9.574 10.317 9.722 10.144C9.871 9.97 9.92 9.846 10.02 9.647C10.119 9.449 10.07 9.276 9.995 9.127C9.92 8.978 9.326 7.515 9.079 6.92C8.837 6.341 8.592 6.42 8.41 6.41C8.237 6.402 8.039 6.4 7.84 6.4C7.642 6.4 7.32 6.474 7.048 6.772C6.776 7.069 6.008 7.788 6.008 9.251C6.008 10.713 7.073 12.126 7.221 12.325C7.37 12.523 9.317 15.525 12.298 16.812C13.007 17.118 13.56 17.301 13.992 17.437C14.704 17.664 15.352 17.632 15.863 17.555C16.434 17.47 17.621 16.836 17.869 16.142C18.117 15.448 18.117 14.853 18.042 14.729C17.968 14.605 17.77 14.531 17.472 14.382Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

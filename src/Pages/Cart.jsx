import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Sample cart data - replace with actual cart state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Dental Mirror",
      price: 29.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80"
    },
    {
      id: 2, 
      name: "Dental Forceps",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: Math.max(0, newQuantity)} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">Your cart is empty</p>
                <Link 
                  to="/wishlist" 
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  View Wishlist
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link 
                    to="/wishlist" 
                    className="group inline-flex items-center gap-2 relative px-6 py-2 rounded-lg shadow-md 
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                    before:transition-all before:duration-500 hover:before:opacity-0
                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                    after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out
                    hover:shadow-lg hover:shadow-green-200 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-white">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                      <span className="font-semibold tracking-wide">Browse from Wishlist</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                className="w-full mt-6 relative px-6 py-3 rounded-lg shadow-md 
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                before:transition-all before:duration-500 hover:before:opacity-0
                after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                transform hover:scale-105 transition-all duration-300 ease-in-out
                hover:shadow-lg hover:shadow-green-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide">
                  Proceed to Checkout
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;



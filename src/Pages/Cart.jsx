import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../Components/emptyCart";
import HorizontalProductCard from "../Components/horizontalProductCard";
import { toast } from 'react-toastify';
import myContext from "../context/data/myContext";
import { useContext, useEffect, useMemo } from "react";

const Cart = () => {
  const {getCart, cartItems, setCartItems, currentUserId, products, isUserLoggedIn} = useContext(myContext);
  const navigate = useNavigate();
  const [productPrices, setProductPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCartItems = async () => {
      if (!isMounted) return;
      
      try {
        // If user is not logged in, clear cart and stop loading
        if (!currentUserId || !isUserLoggedIn) {
          setCartItems([]);
          setIsLoading(false);
          return;
        }

        // Wait for products to be available
        if (!products || products.length === 0) {
          return;
        }

        const items = await getCart(currentUserId);
        if (!isMounted) return;

        // Update cart items only if component is still mounted
        setCartItems(items || []);

        // Create prices map from products
        const prices = {};
        for (const item of items || []) {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            prices[item.productId] = product.price;
          }
        }
        if (isMounted) {
          setProductPrices(prices);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching cart:", error);
          setError("Failed to load cart");
          toast.error("Failed to load cart");
          setCartItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchCartItems();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [currentUserId, getCart, setCartItems, products, isUserLoggedIn]);

  // Memoize calculations to prevent unnecessary re-renders
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cartItems?.reduce(
      (sum, item) => {
        const price = productPrices[item.productId] || 0;
        const quantity = item.quantity || 0;
        return sum + (price * quantity);
      },
      0
    ) || 0;
    const shipping = cartItems?.length > 0 ? 15.0 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  }, [cartItems, productPrices]);

  // Show loading state only on initial load
  if (isLoading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isUserLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your cart</h2>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)] py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center animate-fade-in-down relative group">
          <span className="inline-block">Shopping Cart</span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </h1>
          
        {cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <HorizontalProductCard
                    key={`${item.productId}-${index}`}
                    id={item.productId}
                    quantity={item.quantity}
                  />
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span className="font-semibold tracking-wide">
                      Browse from Wishlist
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {/* Items Summary */}
                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Items ({cartItems?.length})</span>
                      <span className="font-medium">&#x20B9;{subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-gray-50 rounded-md p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Standard Shipping</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">&#x20B9;{shipping.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>&#x20B9;{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>&#x20B9;{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Tax</span>
                      <span>&#x20B9;{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>&#x20B9;{total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        *Final tax will be calculated at checkout
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={() => {
                  
                    if (cartItems?.length === 0) {
                      toast.error("Your cart is empty!");
                      return;
                    }
                    navigate('/checkout', { 
                      state: { 
                        cartItems: cartItems.map(item => ({
                          ...item,
                          price: productPrices[item.productId]
                        })),
                        orderSummary: {
                          subtotal,
                          shipping,
                          tax,
                          total,
                          itemCount: cartItems.length
                        }
                      }
                    });
                  }}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </button>

                {/* Additional Information */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;

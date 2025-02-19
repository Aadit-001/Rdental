import React, { 
    useState, 
    useEffect, 
    useMemo, 
    useCallback ,
    // useNavigate,  //mystate mai hum usenagvigate and use location use nhi kar sakte
    // useLocation
} from 'react';
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc, 
    arrayUnion, 
    arrayRemove, 
    getDoc, 
    setDoc,
    Timestamp 
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import myContext from './myContext';
import { fireDB as fireDb, storage } from '../../firebase/firebaseConfig';

// Utility function for logging
const logError = (context, error) => {
    console.error(`[${context}] Error:`, {
        message: error.message,
        code: error.code,
        stack: error.stack
    });
    toast.error(`${context}: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
    });
};

// Default product structure
const DEFAULT_PRODUCT = {
    title: null,
    imageUrl: null,
    description: null,
    price: null,
    mrp: null,
    category: null,
    rating: 0,
    noOfRatings: 0,
    quantitySold: 0,
    inStock: true,
    totalStock: 0,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })
};


const MyState = (props) => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // Optimized state initialization with lazy loading
    const [currentUserId, setCurrentUserId] = useState(() => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).uid : null;
    });

    const [user, setUser] = useState(() => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    });

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => 
        localStorage.getItem('user') !== null
    );

    // State for UI and data management
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Memoized state for performance
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [product, setProduct] = useState(DEFAULT_PRODUCT);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [userInfo, setUserInfo] = useState({
        firstName: null,
        lastName: null, 
        phone: null,
        address: null,
        email: null,
        city: null,
        pincode: null,
        state: null,
        country: "India",
    });

    // Refs for tracking previous states

    // Memoized selectors
    const getCategoryProducts = useCallback((category) => {
        if (!category || !products) return [];
        
        return products.filter((product) => 
            product.category && 
            product.category.toLowerCase() === category.toLowerCase()
        );
    }, [products]);

    const getBestSellers = useCallback(() => {
        const sortedProducts = [...products]
            .sort((a, b) => b.quantitySold - a.quantitySold)
            .slice(0, 5);
        
        setBestSellers(sortedProducts);
    }, [products]);

    // Optimized data fetching methods
    const getProductData = useCallback(async () => {
        if (products.length > 0) return;

        setIsLoading(true);
        try {
            const q = query(
                collection(fireDb, "products"),
                orderBy("time")
            );
            
            const querySnapshot = await getDocs(q);
            const productsArray = querySnapshot.docs.map(doc => ({
                ...doc.data(), 
                id: doc.id 
            }));
            
            setProducts(productsArray);
        } catch (error) {
            logError('Product Fetch', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const q = query(
                collection(fireDb, "categories"),
                orderBy("time")
            );
            
            const querySnapshot = await getDocs(q);
            const categoriesArray = querySnapshot.docs.map(doc => ({
                ...doc.data(), 
                id: doc.id 
            }));
            
            setCategories(categoriesArray);
        } catch (error) {
            logError('Categories Fetch', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addProduct = useCallback(async () => {
        if (!product.title || !product.price || !product.mrp || !product.imageUrl || !product.category || !product.description) {
            return toast.error('Please fill all fields');
        }
        setIsLoading(true);
        try {
            const productRef = collection(fireDb, "products");
            await addDoc(productRef, {
                ...product,   
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            });

            toast.success("Product added successfully", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,    
                theme: "colored",
              });

            setProduct(DEFAULT_PRODUCT);
        } catch (error) {
            console.error(error);
            toast.error("Error adding product");
        }
        setIsLoading(false);
    }, [product]);

    const deleteProduct = useCallback(async (productId) => {
        try {
            setIsLoading(true);

            const productRef = doc(fireDb, "products", productId);
            const productSnap = await getDoc(productRef);
            
            if (productSnap.exists()) {
                const productData = productSnap.data();
                
                if (productData.imageUrl && productData.imageUrl.includes('firebase')) {
                    const imageRef = ref(storage, productData.imageUrl);
                    try {
                        await deleteObject(imageRef);
                    } catch (error) {
                        console.error("Error deleting image:", error);
                    }
                }
                
                await deleteDoc(productRef);
                toast.success("Product deleted successfully", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                getProductData(); 
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product");
        }
        setIsLoading(false);
    }, []);

    const updateProduct = useCallback(async (productId, updatedData) => {
        try {
            setIsLoading(true);

            const productRef = doc(fireDb, "products", productId);
            const productSnap = await getDoc(productRef);
            
            if (productSnap.exists()) {
                const currentProduct = productSnap.data();
                
                if (updatedData.imageUrl !== currentProduct.imageUrl && 
                    currentProduct.imageUrl && 
                    currentProduct.imageUrl.includes('firebase')) {
                    try {
                        const imageRef = ref(storage, currentProduct.imageUrl);
                        await deleteObject(imageRef);
                    } catch (error) {
                        console.error("Error deleting old image:", error);
                    }
                }
                
                await updateDoc(productRef, {
                    ...updatedData,
                    time: Timestamp.now(),
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
                });

                toast.success("Product updated successfully", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                
                getProductData(); 
            }   
        } catch (error) {
            console.error(error);
            toast.error("Error updating product");
        }
        setIsLoading(false);
    }, []);

    const addCategory = useCallback(async () => {
        setIsLoading(true);
        const category = prompt("Enter category name");
        try {  
            const categoryRef = collection(fireDb, "categories");
            await addDoc(categoryRef, {
                name: category,
                time: Timestamp.now(),
            });
            getCategories();
            toast.success("Category added successfully", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        } catch (e) {
            toast.error("Error adding category");
            console.log(e);
        }
        setIsLoading(false);
    }, []);

    const deleteCategory = useCallback(async (categoryId) => {
        try {
            setIsLoading(true);
            const categoryRef = doc(fireDb, "categories", categoryId);
            await deleteDoc(categoryRef);
            toast.success("Category deleted successfully", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            getCategories(); 
        } catch (error) {
            console.error(error);
            toast.error("Error deleting category");
        }
        setIsLoading(false);
    }, []);

    const addToWishlist = useCallback(async (productId,userId) => {    
        const userRef = doc(fireDb,"users",userId);
        await updateDoc(userRef,{
            wishlist: arrayUnion(productId)   
        });
    }, []);

    // const removeFromWishlist = useCallback(async (productId,userId) => {
    //     const userRef = doc(fireDb,"users",userId);
    //     await updateDoc(userRef,{
    //         wishlist: arrayRemove(productId)  
    //     });
    // }, []);

    
    const getWishlist = useCallback(async (userId) => {
        try {
            const userRef = doc(fireDb, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                return userDoc.data()?.wishlist || [];
            }
            await setDoc(userRef, {
                wishlist: [],
                carts: [],
                orders: [],
                createdAt: Timestamp.now()
            });
            return [];
        } catch (error) {
            console.error("Error getting wishlist:", error);
            return [];
        }
    }, []);
    const removeFromWishlist = useCallback(async (userId, productId) => {
        try {
            const userRef = doc(fireDb, 'users', userId);
            await updateDoc(userRef, {
                wishlist: arrayRemove(productId)  
            });
            
            // Fetch the updated wishlist after removal
            const updatedWishlist = await getWishlist(userId);
            setWishlistItems(updatedWishlist);
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove item from wishlist");
        }
    }, [getWishlist, setWishlistItems]);

    const addToCart = useCallback(async (productId,userId) => {
        const userRef = doc(fireDb,"users",userId);
        await updateDoc(userRef,{
            carts: arrayUnion(
                {
                    productId,
                    quantity: 1,
                    lastUpdated: Date.now()
                }
            )   
        });
    }, []);

    const getCart = useCallback(async (userId) => {
        try {
            const userRef = doc(fireDb, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                return userDoc.data()?.carts || [];
            }
            await setDoc(userRef, {
                wishlist: [],
                carts: [],
                orders: [],
                createdAt: Timestamp.now()
            });
            return [];
        } catch (error) {
            console.error("Error getting cart:", error);
            return [];
        }
    }, []);

    // const addToCart = useCallback(async (productDetails) => {
    //     try {
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         if (!user) {
    //             toast.error("Please login to add items to cart");
    //             return;
    //         }
    
    //         const cartItem = {
    //             ...productDetails,
    //             quantity: 1
    //         };
    
    //         const userRef = doc(fireDb, 'users', user.uid);
    //         await updateDoc(userRef, {
    //             carts: arrayUnion(cartItem)
    //         });
    
    //         // Remove the item from wishlist after adding to cart
    //         // await removeFromWishlist(user.uid, productDetails.id);
    
    //         // Fetch updated cart and wishlist
    //         const updatedCart = await getCart(user.uid);
    //         const updatedWishlist = await getWishlist(user.uid);
    
    //         setCartItems(updatedCart);
    //         setWishlistItems(updatedWishlist);
    
    //         toast.success("Item added to cart");
    //     } catch (error) {
    //         console.error("Error adding to cart:", error);
    //         toast.error("Failed to add item to cart");
    //     }
    // }, [removeFromWishlist, getCart, setCartItems, setWishlistItems]);

    const removeFromCart = useCallback(async (productId,userId) => {
        const userRef = doc(fireDb,"users",userId);
        const cart = await getCart(userId);
        const itemToRemove = cart.find(item => item.productId === productId);
        if (!itemToRemove) return;
        
        await updateDoc(userRef,{
            carts: arrayRemove(itemToRemove)
        });
    }, []);

    

    const getOrders = useCallback(async (userId) => {
        const userRef = doc(fireDb,"users",userId);
        const userDoc = await getDoc(userRef);
        return userDoc.data().orders || [];
    }, []);

    const updatequantity = useCallback(async (productId, userId, quantity) => {
        if (quantity < 1) return; 
        
        const userRef = doc(fireDb, "users", userId);
        const userDoc = await getDoc(userRef);
        const currentCarts = userDoc.data().carts || [];
        
        const itemIndex = currentCarts.findIndex(item => item.productId === productId);
        if (itemIndex === -1) return;
        
        const updatedCarts = [...currentCarts];
        updatedCarts[itemIndex] = {
            ...updatedCarts[itemIndex],
            quantity,
            lastUpdated: Date.now()
        };
        
        await updateDoc(userRef, {
            carts: updatedCarts
        });
    }, []);

    const handleSearch = useCallback((query) => {
        const searchTerm = query.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        setSearchResults(filteredProducts);
        setCurrentProductId(filteredProducts.length > 0 ? filteredProducts[0].id : null);
    }, [products]);

    // Authentication and Initial Data Load Effect
    useEffect(() => {
        let isMounted = true;
        
        const initializeApp = async () => {
            if (isMounted) {
                await getCategories();
                await getProductData();
            }
        };

        initializeApp();

        return () => {
            isMounted = false;
        };
    }, [getCategories, getProductData]);

    // Best Sellers Update Effect
    useEffect(() => {
        let isMounted = true;
        
        if (isMounted && products.length > 0) {
            getBestSellers();
        }

        return () => {
            isMounted = false;
        };
    }, [products, getBestSellers]);


    // const navigate = useNavigate();

    const Logout = useCallback((navigate) => {
        setIsLoading(true);
        // Clear all auth-related states
        // localStorage.clear();
        localStorage.removeItem('user');
        setUser(null);
        setCurrentUserId(null);
        setIsUserLoggedIn(false);
        setShowProfile(false);
        setIsLoading(false);
    
        // Navigate to home if not already there
        navigate('/');
        window.location.reload();
        toast.success('Logged out successfully', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }, []);

    // Memoized context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        currentUserId,
        setCurrentUserId,
        showSignIn,
        setShowSignIn,
        showSignUp,
        setShowSignUp,
        showProfile,
        setShowProfile,
        isUserLoggedIn,
        setIsUserLoggedIn,
        isLoading,
        setIsLoading,
        products,
        product, 
        setProduct,
        addProduct,
        deleteProduct,
        updateProduct,
        getProductData,
        addCategory,
        categories,
        setCategories,
        deleteCategory,
        getCategories,
        getCategoryProducts,
        bestSellers,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        addToCart,
        removeFromCart,
        getCart,
        getOrders,
        updatequantity,
        searchResults,
        handleSearch,
        wishlistItems,
        setWishlistItems,
        cartItems,
        setCartItems,
        setCurrentProductId,
        currentProductId,
        user,
        setUser,
        userInfo,
        setUserInfo,
        Logout
    }), [
        currentUserId, 
        showSignIn, 
        showSignUp, 
        showProfile, 
        isUserLoggedIn, 
        isLoading, 
        products, 
        product, 
        categories, 
        bestSellers, 
        searchResults,
        wishlistItems,
        cartItems,
        currentProductId,
        user,
        userInfo,
        Logout,
        setCurrentUserId,
        setUser,
        setUserInfo
    ]);

    return (
        <myContext.Provider value={contextValue}>
            {props.children}
        </myContext.Provider>
    );
};

MyState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(MyState);

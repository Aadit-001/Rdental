import { useState, useEffect } from 'react';
import myContext from './myContext';
import PropTypes from 'prop-types';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc,arrayUnion, arrayRemove ,getDoc} from 'firebase/firestore';
// import { getDoc, setDoc } from 'firebase/firestore';
import { fireDB as fireDb } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';


const MyState = (props) => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
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
    });

    //future use
    const [cartItems, setCartItems] = useState([]);
    // const [orders, setOrders] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);


    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUserId(user.uid);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
            setCurrentUserId(null);
        }
        setIsLoading(false);
        getCategories();
        getProductData();
    }, []);


    const addProduct = async () => {
        if (!product.title || !product.price || !product.mrp || !product.imageUrl || !product.category || !product.description) {
            return toast.error('Please fill all fields');
        }
        setIsLoading(true);
        try {
            //firestore mai ek collections banaya products ka
            const productRef = collection(fireDb, "products");

            //abb product ko add kiya useing addDoc
            await addDoc(productRef, {
                ...product,   // Spread the product object , matlab spread operator jo hai wo ye object ke andar ka sara kuch bass ...se le aata hai
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            });

            toast.success("Product added successfully");

            //product ke fields ko empty kardia
            setProduct({
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
            });

        } catch (error) {
            console.error(error);
            toast.error("Error adding product");
        }
        setIsLoading(false);
    };

    const deleteProduct = async (productId) => {
        try {
            setIsLoading(true);

            const productRef = doc(fireDb, "products", productId);
            await deleteDoc(productRef);
            toast.success("Product deleted successfully");
            getProductData(); // Refresh the product list
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product");
        }
        setIsLoading(false);
    };

    const updateProduct = async (productId, updatedData) => {
        try {
            setIsLoading(true);

            //firestore ke collections se wo id ka product liya
            const productRef = doc(fireDb, "products", productId);

            //jaise addDoc kiya tha waise hi update kiya
            await updateDoc(productRef, {
                ...updatedData,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            });

            toast.success("Product updated successfully");

            //product ka data phir fetch kiya database se
            getProductData(); // Refresh the product list
        } catch (error) {
            console.error(error);
            toast.error("Error updating product");
        }
        setIsLoading(false);
    };

    const getProductData = () => {
        setIsLoading(true);
        try {
            const q = query(
                collection(fireDb, "products"),
                orderBy("time")
            );
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                let productsArray = [];
                QuerySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id });
                });
                setProducts(productsArray);
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching products:", error);
                toast.error("Error fetching products");
                setIsLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.error("Error setting up products listener:", error);
            toast.error("Error setting up products listener");
            setIsLoading(false);
            return () => { }; // Return empty cleanup function if setup fails
        }
    };

    useEffect(() => {
        let unsubscribe = () => { };
        try {
            unsubscribe = getProductData() || (() => { });
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
        return () => {
            try {
                unsubscribe();
            } catch (error) {
                console.error("Error unsubscribing:", error);
            }
        };
    }, []);

    const addCategory = async () => {
        setIsLoading(true);
        const category = prompt("Enter category name");
        try {
            const categoryRef = collection(fireDb, "categories");
            await addDoc(categoryRef, {
                name: category,
                time: Timestamp.now(),
            });
            // setCategories([...categories, category]);
            getCategories();
            toast.success("Category added successfully");
        } catch (e) {
            toast.error("Error adding category");
            console.log(e);
        }
        setIsLoading(false);
    }

    const getCategories = () => {
        setIsLoading(true);
        try {
            const q = query(
                collection(fireDb, "categories"),
                orderBy("time")
            );
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                let categoriesArray = [];
                QuerySnapshot.forEach((doc) => {
                    categoriesArray.push({ ...doc.data(), id: doc.id });
                });
                setCategories(categoriesArray);
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching categories:", error);
                toast.error("Error fetching categories");
                setIsLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.error("Error setting up categories listener:", error);
            toast.error("Error setting up categories listener");
            setIsLoading(false);
            return () => { }; // Return empty cleanup function if setup fails
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            const categoryRef = doc(fireDb, "categories", categoryId);
            await deleteDoc(categoryRef);
            toast.success("Category deleted successfully");
            getCategories(); // Refresh the category list
        } catch (error) {
            console.error(error);
            toast.error("Error deleting category");
        }
        setIsLoading(false);
    };

    const getCategoryProducts = (category) => {
        return products.filter((product) => product.category === category);
    };

    const getBestSellers = () => {
        const sortedProducts = [...products].sort((a, b) => b.quantitySold - a.quantitySold);
        setBestSellers(sortedProducts.slice(0, 5));
        if(location.pathname === '/products/best-sellers'){
            setBestSellers(sortedProducts);
            console.log(bestSellers);
        }
    };

    const addToWishlist = async (productId,userId) => {    
        const userRef = doc(fireDb,"users",userId);
        // const productRef = doc(fireDb,"products",productId);
        await updateDoc(userRef,{
            wishlist: arrayUnion(productId)   //arrayunion is used to add an element to an array
        });
    }

    const removeFromWishlist = async (productId,userId) => {
        const userRef = doc(fireDb,"users",userId);
        await updateDoc(userRef,{
            wishlist: arrayRemove(productId)  //arrayremove is used to remove an element from an array
        });
    }

    const getWishlist = async (userId) => {
        const userRef = doc(fireDb,"users",userId);
        const userDoc = await getDoc(userRef);
        return userDoc.data().wishlist || [];
    }

    const addToCart = async (productId,userId) => {
        const userRef = doc(fireDb,"users",userId);
        await updateDoc(userRef,{
            carts: arrayUnion(
                {
                    productId,
                    quantity: 1,
                    lastUpdated: Date.now()
                }
            )   //arrayunion is used to add an element to an array
        });
    }

    const removeFromCart = async (productId,userId) => {
        const userRef = doc(fireDb,"users",userId);
        const cart = await getCart(userId);
        const itemToRemove = cart.find(item => item.productId === productId);
        if (!itemToRemove) return;
        
        await updateDoc(userRef,{
            carts: arrayRemove(itemToRemove)
        });
    }

    const getCart = async (userId) => {
        const userRef = doc(fireDb,"users",userId);
        const userDoc = await getDoc(userRef);
        return userDoc.data().carts || [];
    }

    const getOrders = async (userId) => {
        const userRef = doc(fireDb,"users",userId);
        const userDoc = await getDoc(userRef);
        return userDoc.data().orders || [];
    }

    const updatequantity = async (productId, userId, quantity) => {
        if (quantity < 1) return; // Don't allow quantity less than 1
        
        const userRef = doc(fireDb, "users", userId);
        const userDoc = await getDoc(userRef);
        const currentCarts = userDoc.data().carts || [];
        
        // Find the index of the item to update
        const itemIndex = currentCarts.findIndex(item => item.productId === productId);
        if (itemIndex === -1) return;
        
        // Create new array with updated quantity
        const updatedCarts = [...currentCarts];
        updatedCarts[itemIndex] = {
            ...updatedCarts[itemIndex],
            quantity,
            lastUpdated: Date.now()
        };
        
        // Update the entire carts array
        await updateDoc(userRef, {
            carts: updatedCarts
        });
    }



    useEffect(() => {
        if (products.length > 0) {
            getBestSellers();
        }
    }, [products]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUserId(user.uid);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
            setCurrentUserId(null);
        }
        setIsLoading(false);
        getCategories();
    }, []);

    return (
        <myContext.Provider value={{
            showSignIn, setShowSignIn,
            showSignUp, setShowSignUp,
            showProfile, setShowProfile,
            isUserLoggedIn, setIsUserLoggedIn,
            isLoading, setIsLoading,
            products,
            product, setProduct,
            addProduct,
            deleteProduct,
            updateProduct,
            getProductData,
            addCategory,
            categories,setCategories,
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
            currentUserId,
            setCurrentUserId,
            wishlistItems,
            setWishlistItems,
            cartItems,
            setCartItems
        }}>
            {props.children}
        </myContext.Provider>
    );
};

MyState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MyState;

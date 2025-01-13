import { useState, useEffect } from 'react';
import myContext from './myContext';
import PropTypes from 'prop-types';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import { getDoc, setDoc } from 'firebase/firestore';
import { fireDB as fireDb } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';


const MyState = (props) => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
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
    // const [cart, setCart] = useState([]);
    // const [orders, setOrders] = useState([]);
    // const [wishlist, setWishlist] = useState([]);
    // const [bestSellers, setBestSellers] = useState([]);


    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsUserLoggedIn(!!user);
        setIsLoading(false);
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




    return (
        <myContext.Provider value={{
            showSignIn, setShowSignIn,
            showSignUp, setShowSignUp,
            showProfile, setShowProfile,
            isUserLoggedIn, setIsUserLoggedIn,
            isLoading,
            products,
            product, setProduct,
            addProduct,
            deleteProduct,
            updateProduct,
            getProductData
        }}>
            {props.children}
        </myContext.Provider>
    );
};

MyState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MyState;

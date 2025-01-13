import { useState, useEffect } from 'react';
import myContext from './myContext';
import PropTypes from 'prop-types';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { fireDB as fireDb } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const demoProducts = [
    {
        id: 1,
        title: "Digital X-Ray Sensor",
        description: "High-resolution digital dental X-ray sensor with USB connectivity",
        price: 24999,
        mrp: 29999,
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80",
        category: "Equipment",
        rating: 4.5
    },
    {
        id: 2,
        title: "Dental Composite Kit",
        description: "Professional light-cure composite restoration kit",
        price: 3999,
        mrp: 4999,
        image: "https://images.unsplash.com/photo-1615916732335-95d99bcd5bd6?q=80",
        category: "Restoratives",
        rating: 4.8
    },
    {
        id: 3,
        title: "Autoclave Sterilizer",
        description: "18L Class B autoclave sterilizer with LCD display",
        price: 89999,
        mrp: 99999,
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80",
        category: "Sterilization",
        rating: 4.7
    },
    {
        id: 4,
        title: "Root Canal Files Set",
        description: "Complete set of endodontic files for root canal treatment",
        price: 1999,
        mrp: 2499,
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80",
        category: "Endodontics",
        rating: 4.6
    }
];

const MyState = (props) => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('light');
    const [product, setProduct] = useState(demoProducts);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsUserLoggedIn(!!user);
        setIsLoading(false);
    }, []);

    const [products, setProducts] = useState({
        title: null,
        imageUrl: null,
        description: null,
        price: null,
        mrp: null,
        category: null,
        rating: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const addProduct = async () => {
        if (!products.title || !products.price || !products.mrp || !products.imageUrl || !products.category || !products.description) {
            return toast.error('Please fill all fields');
        }
        const productRef = collection(fireDb, "products");
        try {
            await addDoc(productRef, products);
            toast.success("Product added successfully");
        } catch (error) {
            console.error(error);
        }
        setProducts("");
    };

    const getProductData = async () => {
        try {
            const q = query(collection(fireDb, "products"), orderBy("time"));
            const data = onSnapshot(q, (QuerySnapshot) => {
                const productsArray = [];
                QuerySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productsArray);
            });
            return () => data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const addToWishlist = async (productId) => {
        if (!isUserLoggedIn) {
            return toast.error('Please login to add to wishlist');
        }

        const wishlistRef = doc(fireDb, 'users', localStorage.getItem('user'));
        const wishlistDoc = await getDoc(wishlistRef);
        if (!wishlistDoc.exists()) {
            await setDoc(wishlistRef, {
                wishlist: [productId],
            });
        } else {
            const wishlistArray = wishlistDoc.data().wishlist || [];
            if (!wishlistArray.includes(productId)) {
                await updateDoc(wishlistRef, {
                    wishlist: [...wishlistArray, productId],
                });
            }
        }
    };

    return (
        <myContext.Provider
            value={{
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
                mode,
                setMode,
                product,
                setProduct,
                products,
                addProduct,
                setProducts,
                addToWishlist,
            }}
        >
            {props.children}
        </myContext.Provider>
    );
};

MyState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MyState;

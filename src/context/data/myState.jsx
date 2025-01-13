import myContext from './myContext';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { fireDB as fireDb } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';


const MyState = (props) => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check localStorage and update state
        const user = localStorage.getItem('user');
        setIsUserLoggedIn(!!user);
        setIsLoading(false);
    }, []); // Only run once on mount

    
    const [products, setProducts] = useState({
        title: null,
        imageUrl: null,
        description: null,
        price: null,
        mrp: null,
        category: null,
        rating: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      })
    
      // ********************** Add Product Section  **********************
      const addProduct = async () => {
        if (products.title == null || products.price == null || products.mrp == null || products.imageUrl == null || products.category == null || products.description == null) {
          return toast.error('Please fill all fields')
        }
        const productRef = collection(fireDb, "products")
        // setLoading(true)
        try {
          await addDoc(productRef, products)
          toast.success("Product Add successfully")
        //   getProductData()
        //   closeModal()
        //   setLoading(false)
        } catch (error) {
          console.log(error)
        //   setLoading(false)
        }
        setProducts("")
      }
    
      const [product, setProduct] = useState([]);
    
      // ****** get product
      const getProductData = async () => {
        // setLoading(true)
        try {
          const q = query(
            collection(fireDb, "products"),
            orderBy("time"),
            // limit(5)
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
            let productsArray = [];
            QuerySnapshot.forEach((doc) => {
              productsArray.push({ ...doc.data(), id: doc.id });
            });
            setProduct(productsArray)
            // setLoading(false);
          });
          return () => data;
        } catch (error) {
          console.log(error)
        //   setLoading(false)
        }
      }
    
      useEffect(() => {
        getProductData();
      }, []);


    //   **************************Add product to wishlist************************
    const addToWishlist = async (productId) => {
        if (!isUserLoggedIn) {
            return toast.error('Please login to add to wishlist')
        }

        const wishlistRef = doc(fireDb, 'users', localStorage.getItem('user'));
        const wishlistDoc = await getDoc(wishlistRef);
        if (!wishlistDoc.exists()) {
            await setDoc(wishlistRef, {
                wishlist: [productId]
            });
        } else {
            const wishlistArray = wishlistDoc.data().wishlist || [];
            if (!wishlistArray.includes(productId)) {
                await updateDoc(wishlistRef, {
                    wishlist: [...wishlistArray, productId]
                });
            }
        }
    };




    

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
                isLoading,
                setIsLoading,
                products,
                addProduct,
                product,
                setProduct,
                setProducts,
                addToWishlist

            }}>
            {props.children}
        </myContext.Provider>
    )
}

MyState.propTypes = {
    children: PropTypes.node.isRequired
}

export default MyState;
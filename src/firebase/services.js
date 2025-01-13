import { 
    collection, 
    doc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { fireDB as db } from './firebaseConfig.jsx';

// Collections
export const productsCollection = collection(db, 'products');
export const cartsCollection = collection(db, 'carts');
export const wishlistsCollection = collection(db, 'wishlists');

// Product Operations
export const fetchAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(productsCollection);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Cart Operations
export const fetchUserCart = async (userId) => {
    try {
        const cartDoc = doc(cartsCollection, userId);
        const cartSnapshot = await getDocs(cartDoc);
        return cartSnapshot.exists() ? cartSnapshot.data() : { items: [] };
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const updateUserCart = async (userId, cartItems) => {
    try {
        const cartDoc = doc(cartsCollection, userId);
        await setDoc(cartDoc, { items: cartItems }, { merge: true });
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
};

export const addToCart = async (userId, product) => {
    try {
        const cartDoc = doc(cartsCollection, userId);
        await updateDoc(cartDoc, {
            items: arrayUnion({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            })
        });
    } catch (error) {
        // If cart doesn't exist, create it
        if (error.code === 'not-found') {
            await setDoc(cartDoc, {
                items: [{
                    ...product,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                }]
            });
        } else {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }
};

export const removeFromCart = async (userId, productId) => {
    try {
        const cartDoc = doc(cartsCollection, userId);
        const cart = await fetchUserCart(userId);
        const updatedItems = cart.items.filter(item => item.id !== productId);
        await setDoc(cartDoc, { items: updatedItems });
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (userId, productId, quantity) => {
    try {
        const cartDoc = doc(cartsCollection, userId);
        const cart = await fetchUserCart(userId);
        const updatedItems = cart.items.map(item => 
            item.id === productId ? { ...item, quantity } : item
        );
        await setDoc(cartDoc, { items: updatedItems });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};

// Wishlist Operations
export const fetchUserWishlist = async (userId) => {
    try {
        const wishlistDoc = doc(wishlistsCollection, userId);
        const wishlistSnapshot = await getDocs(wishlistDoc);
        return wishlistSnapshot.exists() ? wishlistSnapshot.data().items : [];
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
};

export const addToWishlist = async (userId, productId) => {
    try {
        const wishlistDoc = doc(wishlistsCollection, userId);
        await updateDoc(wishlistDoc, {
            items: arrayUnion(productId)
        });
    } catch (error) {
        // If wishlist doesn't exist, create it
        if (error.code === 'not-found') {
            await setDoc(wishlistDoc, {
                items: [productId]
            });
        } else {
            console.error('Error adding to wishlist:', error);
            throw error;
        }
    }
};

export const removeFromWishlist = async (userId, productId) => {
    try {
        const wishlistDoc = doc(wishlistsCollection, userId);
        await updateDoc(wishlistDoc, {
            items: arrayRemove(productId)
        });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
};

// Function to add initial products
export const addInitialProducts = async () => {
    try {
        const products = [
            {
                id: "1",
                name: "Dental Mirror",
                price: 29.99,
                description: "High-quality stainless steel dental mirror for professional use",
                category: "instruments",
                imageUrl: "https://example.com/dental-mirror.jpg",
                stock: 50,
                rating: 4.5,
            },
            {
                id: "2",
                name: "Dental Explorer",
                price: 34.99,
                description: "Precision dental explorer for cavity detection",
                category: "instruments",
                imageUrl: "https://example.com/dental-explorer.jpg",
                stock: 40,
                rating: 4.3,
            },
            {
                id: "3",
                name: "Dental Forceps",
                price: 89.99,
                description: "Professional-grade dental extraction forceps",
                category: "instruments",
                imageUrl: "https://example.com/dental-forceps.jpg",
                stock: 30,
                rating: 4.7,
            },
            {
                id: "4",
                name: "Dental Burs Kit",
                price: 149.99,
                description: "Complete set of diamond dental burs",
                category: "consumables",
                imageUrl: "https://example.com/dental-burs.jpg",
                stock: 25,
                rating: 4.8,
            },
            {
                id: "5",
                name: "Dental Implant Kit",
                price: 999.99,
                description: "Complete dental implant system with tools",
                category: "implants",
                imageUrl: "https://example.com/implant-kit.jpg",
                stock: 10,
                rating: 4.9,
            }
        ];

        for (const product of products) {
            await setDoc(doc(productsCollection, product.id), product);
        }

        console.log("Initial products added successfully");
    } catch (error) {
        console.error("Error adding initial products:", error);
        throw error;
    }
};

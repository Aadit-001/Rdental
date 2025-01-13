import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { fireDB as db } from '../../firebase/firebaseConfig';

// Async thunk for fetching user's cart
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId) => {
        try {
            const cartRef = doc(db, 'carts', userId);
            const cartDoc = await getDoc(cartRef);
            if (cartDoc.exists()) {
                return cartDoc.data().items || [];
            }
            return [];
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    }
);

// Async thunk for adding item to cart
export const addItemToCart = createAsyncThunk(
    'cart/addItem',
    async ({ userId, product }, { getState }) => {
        try {
            const cartRef = doc(db, 'carts', userId);
            const cartDoc = await getDoc(cartRef);
            let items = [];

            if (cartDoc.exists()) {
                items = cartDoc.data().items || [];
                const existingItem = items.find(item => item.id === product.id);
                
                if (existingItem) {
                    items = items.map(item => 
                        item.id === product.id 
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    items.push({ ...product, quantity: 1 });
                }
            } else {
                items = [{ ...product, quantity: 1 }];
            }

            await setDoc(cartRef, { items }, { merge: true });
            return items;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }
);

// Async thunk for removing item from cart
export const removeItemFromCart = createAsyncThunk(
    'cart/removeItem',
    async ({ userId, productId }, { getState }) => {
        try {
            const cartRef = doc(db, 'carts', userId);
            const cartDoc = await getDoc(cartRef);
            
            if (cartDoc.exists()) {
                const items = cartDoc.data().items.filter(item => item.id !== productId);
                await setDoc(cartRef, { items }, { merge: true });
                return items;
            }
            return [];
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    }
);

// Async thunk for updating item quantity
export const updateItemQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ userId, productId, quantity }, { getState }) => {
        try {
            const cartRef = doc(db, 'carts', userId);
            const cartDoc = await getDoc(cartRef);
            
            if (cartDoc.exists()) {
                const items = cartDoc.data().items.map(item =>
                    item.id === productId
                        ? { ...item, quantity }
                        : item
                );
                await setDoc(cartRef, { items }, { merge: true });
                return items;
            }
            return [];
        } catch (error) {
            console.error('Error updating quantity:', error);
            throw error;
        }
    }
);

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
        calculateTotals: (state) => {
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle addItemToCart
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle removeItemFromCart
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle updateItemQuantity
            .addCase(updateItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;

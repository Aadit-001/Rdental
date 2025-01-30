import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { fireDB as db } from '../../firebase/firebaseConfig';

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const productsRef = collection(db, 'products');
            const querySnapshot = await getDocs(productsRef);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() });
            });
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
);

// Async thunk for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category) => {
        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() });
            });
            return products;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    }
);

// Async thunk for fetching a single product
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        try {
            const productRef = doc(db, 'products', productId);
            const productDoc = await getDoc(productRef);
            if (productDoc.exists()) {
                return { id: productDoc.id, ...productDoc.data() };
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
);

const initialState = {
    products: [],
    filteredProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
    filters: {
        category: null,
        priceRange: null,
        searchQuery: '',
        brand: null,
        inStock: null,
        rating: null
    },
    categories: [
        'Diagnostic',
        'Surgical',
        'Preventive',
        'Restorative',
        'Endodontic',
        'Prosthodontic',
        'Orthodontic',
        'Periodontic'
    ],
    wishlist: [],
    recentlyViewed: [],
    sortBy: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
            const exists = state.recentlyViewed.find(p => p.id === action.payload.id);
            if (!exists) {
                state.recentlyViewed = [action.payload, ...state.recentlyViewed].slice(0, 5);
            }
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            let filtered = [...state.products];
            
            if (state.filters.category) {
                filtered = filtered.filter(product => 
                    product.category === state.filters.category
                );
            }
            
            if (state.filters.priceRange) {
                filtered = filtered.filter(product => 
                    product.price >= state.filters.priceRange[0] && 
                    product.price <= state.filters.priceRange[1]
                );
            }
            
            if (state.filters.searchQuery) {
                const query = state.filters.searchQuery.toLowerCase();
                filtered = filtered.filter(product => 
                    product.title.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
            }

            if (state.filters.brand) {
                filtered = filtered.filter(product => 
                    product.brand === state.filters.brand
                );
            }

            if (state.filters.inStock !== null) {
                filtered = filtered.filter(product => 
                    product.inStock === state.filters.inStock
                );
            }

            if (state.filters.rating) {
                filtered = filtered.filter(product => 
                    product.rating >= state.filters.rating
                );
            }

            if (state.sortBy) {
                switch (state.sortBy) {
                    case 'price-asc':
                        filtered.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        filtered.sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        filtered.sort((a, b) => b.rating - a.rating);
                        break;
                    case 'newest':
                        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        break;
                    default:
                        break;
                }
            }
            
            state.filteredProducts = filtered;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            productsSlice.caseReducers.setFilters(state, { payload: {} });
        },
        clearFilters: (state) => {
            state.filters = {
                category: null,
                priceRange: null,
                searchQuery: '',
                brand: null,
                inStock: null,
                rating: null
            };
            state.sortBy = null;
            state.filteredProducts = state.products;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchProductsByCategory
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchProductById
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
                const exists = state.recentlyViewed.find(p => p.id === action.payload.id);
                if (!exists) {
                    state.recentlyViewed = [action.payload, ...state.recentlyViewed].slice(0, 5);
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { 
    setSelectedProduct,
    setFilters,
    setSortBy,
    clearFilters
} = productsSlice.actions;

export default productsSlice.reducer;

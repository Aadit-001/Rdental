import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDB as db, auth } from '../../firebase/firebaseConfig';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;

            // Get additional user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data() || {};

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                ...userData
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, password, displayName }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;

            // Update profile with display name
            await updateProfile(user, { displayName });

            // Create user document in Firestore
            const userDoc = doc(db, 'users', user.uid);
            await setDoc(userDoc, {
                email,
                displayName,
                createdAt: new Date().toISOString(),
                role: 'customer'
            });

            return {
                uid: user.uid,
                email: user.email,
                displayName,
                role: 'customer'
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ userId, userData }) => {
        try {
            const user = auth.currentUser;

            if (userData.displayName) {
                await updateProfile(user, { displayName: userData.displayName });
            }

            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, userData);

            const updatedDoc = await getDoc(userDoc);
            return updatedDoc.data();
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }
);

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
            // Handle registration
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
            // Handle logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.currentUser = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle profile update
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = { ...state.currentUser, ...action.payload };
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;

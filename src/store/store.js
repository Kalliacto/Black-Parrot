import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import userSlice from './slices/userSlice';
import oneProductSlice from './slices/oneProductSlice';
import basketSlice from './slices/basketSlice';

const store = configureStore({
    reducer: {
        products: productsSlice,
        user: userSlice,
        oneProduct: oneProductSlice,
        basket: basketSlice,
    },
});

export default store;

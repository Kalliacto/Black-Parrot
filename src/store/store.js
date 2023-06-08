import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import userSlice from './slices/userSlice';
import oneProductSlice from './slices/oneProductSlice';
import { api } from '../utils/api';

const store = configureStore({
    reducer: {
        products: productsSlice,
        user: userSlice,
        oneProduct: oneProductSlice,
    },
    // middleware: (getDefaultMiddleWare) =>
    //     getDefaultMiddleWare({
    //         thunk: {
    //             extraArgument: api,
    //         },
    //     }),
});

export default store;

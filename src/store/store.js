import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import { api } from '../utils/api';

const store = configureStore({
    reducer: {
        products: productSlice,
        user: userSlice,
    },
    // middleware: (getDefaultMiddleWare) =>
    //     getDefaultMiddleWare({
    //         thunk: {
    //             extraArgument: api,
    //         },
    //     }),
});

export default store;

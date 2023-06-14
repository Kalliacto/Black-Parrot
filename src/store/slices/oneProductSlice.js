import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { forErrors, isLoadingData, showError } from '../utilsStore';

const initialState = {
    product: {},
    reviews: [],
    isLoading: false,
    productsInLocal: [],
};

export const getInfoOneProduct = createAsyncThunk('oneProduct/getInfoOneProduct', async (id) => {
    const productInfo = await api.getOneProduct(id);
    return productInfo;
});

export const getProductAllReviewsInfo = createAsyncThunk(
    'oneProduct/getProductAllReviewsInfo',
    async (id) => {
        const productInfoReviews = await api.getProductAllReviews(id);
        return productInfoReviews;
    }
);

export const deleteReview = createAsyncThunk(
    'oneProduct/deleteReview',
    async ({ productInfo, item }) => {
        const newData = await api.deleteProductReview(productInfo._id, item._id);
        return newData;
    }
);

export const addReview = createAsyncThunk('oneProduct/addReview', async (data) => {
    const newData = await api.addNewReview(data.id, data.body);
    return newData;
});

const oneProductSlice = createSlice({
    name: 'oneProductInfo',
    initialState,
    reducers: {
        updateProduct(state, action) {
            state.product = action.payload;
        },
        updateProductsInLocal(state, action) {
            state.productsInLocal = JSON.parse(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfoOneProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;

            if (state.productsInLocal.length === 0) state.productsInLocal.push(action.payload);
            if (state.productsInLocal.find((el) => el._id !== action.payload._id)) {
                if (state.productsInLocal.length < 5) {
                    state.productsInLocal.push(action.payload);
                } else {
                    state.productsInLocal.shift();
                    state.productsInLocal.push(action.payload);
                }
            }
            localStorage.setItem('productsInLocal', JSON.stringify(state.productsInLocal));
        });
        builder.addCase(getProductAllReviewsInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload;
        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews;
        });
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews;
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
});
export const { updateProduct, updateProductsInLocal } = oneProductSlice.actions;
export default oneProductSlice.reducer;

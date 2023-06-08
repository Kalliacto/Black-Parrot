import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { forErrors, isLoadingData, showError } from '../utilsStore';

const initialState = {
    product: {},
    reviews: [],
    isLoading: false,
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
    },
    extraReducers: (builder) => {
        builder.addCase(getInfoOneProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
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
export const { updateProduct } = oneProductSlice.actions;
export default oneProductSlice.reducer;

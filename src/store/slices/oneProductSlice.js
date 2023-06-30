import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { isLoadingData } from '../utilsStore';
import { toast } from 'react-toastify';

const initialState = {
    product: {},
    reviews: [],
    isLoading: false,
    productsInLocal: [],
};

export const getInfoOneProduct = createAsyncThunk(
    'oneProduct/getInfoOneProduct',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        try {
            const productInfo = await api.getOneProduct(id);
            return fulfillWithValue(productInfo);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getProductAllReviewsInfo = createAsyncThunk(
    'oneProduct/getProductAllReviewsInfo',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        try {
            const productInfoReviews = await api.getProductAllReviews(id);
            return fulfillWithValue(productInfoReviews);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteReview = createAsyncThunk(
    'oneProduct/deleteReview',
    async ({ productInfo, item }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const newData = await api.deleteProductReview(productInfo._id, item._id);
            return fulfillWithValue(newData);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addReview = createAsyncThunk(
    'oneProduct/addReview',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
            const newData = await api.addNewReview(data.id, data.body);
            return fulfillWithValue(newData);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

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
        updateProductsInLocalLike(state, action) {
            state.productsInLocal = state.productsInLocal.map((el) =>
                el._id === action.payload._id ? action.payload : el
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfoOneProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
            if (state.productsInLocal.length === 0) state.productsInLocal.push(action.payload);
            if (!state.productsInLocal.find((el) => el._id === action.payload._id)) {
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
            state.product = action.payload;
        });
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews;
            state.product = action.payload;
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(
            isRejected(getInfoOneProduct, getProductAllReviewsInfo, deleteReview, addReview),
            (state, action) => {
                state.isLoading = false;
                toast.error(action.payload.message);
            }
        );
    },
});
export const { updateProduct, updateProductsInLocal, updateProductsInLocalLike } =
    oneProductSlice.actions;
export default oneProductSlice.reducer;

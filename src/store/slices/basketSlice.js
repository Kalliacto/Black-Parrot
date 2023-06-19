import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forErrors, showError } from '../utilsStore';
import { api } from '../../utils/api';

const initialState = {
    basketProducts: [],
    isLoading: false,
};

export const sendingAnOrder = createAsyncThunk(
    'basket/sendingAnOrder',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
            const productInfo = await api.sendProductOrder(data);
            return fulfillWithValue(productInfo);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const basketSlice = createSlice({
    name: 'basket',
    initialState: initialState,
    reducers: {
        updateBasketProducts: (state, action) => {
            state.basketProducts = JSON.parse(action.payload);
        },
        addBasketProduct: (state, action) => {
            const checkProductInBasket = state.basketProducts.find(
                (e) => e.product._id === action.payload.product._id
            );
            if (checkProductInBasket) {
                const order = checkProductInBasket.count + action.payload.count;
                checkProductInBasket.count =
                    order <= action.payload.product.stock ? order : checkProductInBasket.count;
            } else {
                state.basketProducts.push(action.payload);
            }
            localStorage.setItem('basketParrot', JSON.stringify(state.basketProducts));
        },
        removeBasketProduct: (state, action) => {
            const checkProductInBasket = state.basketProducts.find(
                (e) => e.product._id === action.payload.product._id
            );
            if (checkProductInBasket) {
                const order = checkProductInBasket.count - action.payload.count;
                checkProductInBasket.count = order <= 0 ? 0 : order;
                if (checkProductInBasket.count === 0) {
                    state.basketProducts = state.basketProducts.filter(
                        (e) => e.product._id !== action.payload.product._id
                    );
                }
            }
            localStorage.setItem('basketParrot', JSON.stringify(state.basketProducts));
        },
        deleteProductFromBasket: (state, action) => {
            state.basketProducts = state.basketProducts.filter(
                (e) => e.product._id !== action.payload._id
            );
            localStorage.setItem('basketParrot', JSON.stringify(state.basketProducts));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendingAnOrder.fulfilled, (state) => {
            state.isLoading = false;
            state.basketProducts = [];
            localStorage.setItem('basketParrot', JSON.stringify(state.basketProducts));
        });
        builder.addMatcher(forErrors, (state, { payload }) => {
            showError(payload.error.message);
        });
    },
});

export const {
    addBasketProduct,
    removeBasketProduct,
    deleteProductFromBasket,
    updateBasketProducts,
} = basketSlice.actions;
export default basketSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    basketProducts: [],
    isLoading: false,
};

export const sendingAnOrder = createAsyncThunk('basket/sendingAnOrder', async (data) => {
    const productInfo = await fetch('https://reqres.in/api/users', {
        method: 'post',
        body: JSON.stringify(data),
    });
    return productInfo;
});

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
        // deleteAllProducts: (state, action) => {
        //     state.basketProducts = [];
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(sendingAnOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.basketProducts = [];
        });
    },
});
// ----------------------------------------------------

export const {
    addBasketProduct,
    removeBasketProduct,
    deleteProductFromBasket,
    updateBasketProducts,
} = basketSlice.actions;
export default basketSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { forErrors, isLoadingData, showError } from '../utilsStore';
import { findFavorite, myCards } from '../../utils/utils';

const initialState = {
    dataProducts: [],
    isLoading: false,
    total: 0,
    favoritesCards: [],
};

export const getAllProductsData = createAsyncThunk(
    'products/getAllProductsData',
    async (_, { getState, fulfillWithValue, rejectWithValue }) => {
        try {
            const state = getState();
            const allProducts = await api.getAllProducts();
            return fulfillWithValue({ ...allProducts, userId: state.user.userData._id });
        } catch (error) {}
    }
);

export const changingLikeOnProductCards = createAsyncThunk(
    'products/changingLikeOnProductCards',
    async (data, arg) => {
        try {
            const updateLikeInCard = await api.editLikeCard(data.product._id, data.cardLiked);
            console.log(data.product._id, data.cardLiked);
            return arg.fulfillWithValue({ updateLikeInCard, cardLiked: data.cardLiked });
        } catch (error) {}
    }
);

//------------slice// reduser-----------
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // setList(state, action) {
        //     state.dataProducts = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductsData.fulfilled, (state, action) => {
            const filteredCards = myCards(action.payload.products);
            state.dataProducts = filteredCards;
            state.total = filteredCards.length;
            state.favoritesCards = filteredCards.filter((item) =>
                findFavorite(item, action.payload.userId)
            );
        });
        builder.addCase(changingLikeOnProductCards.fulfilled, (state, action) => {
            const { updateLikeInCard, cardLiked } = action.payload;
            state.dataProducts = state.dataProducts.map((item) =>
                item._id === updateLikeInCard._id ? updateLikeInCard : item
            );
            if (cardLiked) {
                state.favoritesCards = state.favoritesCards.filter(
                    (item) => item._id !== updateLikeInCard._id
                );
            } else {
                state.favoritesCards = [...state.favoritesCards, updateLikeInCard];
            }
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
});

// export const setList  = productSlice.actions.setList; Более длинная запись чтобы достать конкретный action
export const { setList } = productSlice.actions;
export default productSlice.reducer;

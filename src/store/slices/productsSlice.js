import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { forErrors, isLoadingData, showError } from '../utilsStore';
import { findFavorite, myFilterCards, productRating } from '../../utils/utils';
import { updateProduct } from './oneProductSlice';

const initialState = {
    products: [],
    isLoading: false,
    total: 0,
    favoritesCards: [],
    search: null,
};

export const getAllProductsData = createAsyncThunk(
    'products/getAllProductsData',
    async (_, { getState, fulfillWithValue, rejectWithValue }) => {
        try {
            const state = getState();
            const allProducts = await api.getAllProducts();
            return fulfillWithValue({ ...allProducts, userId: state.user.userData._id });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const changingLikeOnProductCards = createAsyncThunk(
    'products/changingLikeOnProductCards',
    async (data, { dispatch, fulfillWithValue, rejectWithValue }) => {
        try {
            const updateLikeInCard = await api.editLikeCard(data.product._id, data.cardLiked);
            dispatch(updateProduct(updateLikeInCard));
            return fulfillWithValue({ updateLikeInCard, cardLiked: data.cardLiked });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (search, { fulfillWithValue, rejectWithValue }) => {
        try {
            const searchResult = await api.searchProducts(search);
            return fulfillWithValue(searchResult);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        sortingProducts: (state, action) => {
            switch (action.payload) {
                case 'lowPrice':
                    state.products = state.products.sort((a, b) => a.price - b.price);
                    break;
                case 'highPrice':
                    state.products = state.products.sort((a, b) => b.price - a.price);
                    break;
                case 'sale':
                    state.products = state.products.sort((a, b) => b.discount - a.discount);
                    break;
                case 'newProduct':
                    state.products = state.products.sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    );
                    break;
                case 'popular':
                    state.products = state.products.sort((a, b) => b.likes.length - a.likes.length);
                    break;
                case 'rate':
                    state.products = state.products.sort(
                        (a, b) => productRating(b.reviews) - productRating(a.reviews)
                    );
                    break;
                default:
                    state.products = state.products.sort((a, b) => a.price - b.price);
            }
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductsData.fulfilled, (state, action) => {
            state.isLoading = false;
            const filteredCards = myFilterCards(action.payload.products);
            state.products = filteredCards;
            state.total = filteredCards.length;
            state.favoritesCards = filteredCards.filter((item) =>
                findFavorite(item, action.payload.userId)
            );
        });
        builder.addCase(changingLikeOnProductCards.fulfilled, (state, action) => {
            const { updateLikeInCard, cardLiked } = action.payload;
            state.products = state.products.map((item) =>
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
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = myFilterCards(action.payload);
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
export const { sortingProducts, setSearch } = productSlice.actions;
export default productSlice.reducer;

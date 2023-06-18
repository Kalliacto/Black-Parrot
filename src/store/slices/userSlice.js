import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../utils/apiUser';
import { forErrors, isLoadingData, showError } from '../utilsStore';

const initialState = {
    userData: {},
    isLoading: false,
    isAuth: false,
};

export const getUser = createAsyncThunk(
    'user/getUser',
    async function (_, { fulfillWithValue, rejectWithValue }) {
        try {
            const userInfo = await userApi.getUserInfo();
            return fulfillWithValue(userInfo);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async function (newUserData, { fulfillWithValue, rejectWithValue }) {
        try {
            if (newUserData.avatar) {
                const userData = await userApi.changingAvatarUser({ avatar: newUserData.avatar });
                return fulfillWithValue(userData);
            }
            return await userApi.changingDataUser({
                name: newUserData.name,
                about: newUserData.about,
            });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
});

export const { setIsAuth } = userSlice.actions;
export default userSlice.reducer;

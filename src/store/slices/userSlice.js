import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../utils/apiUser';
import { forErrors, isLoadingData, showError } from '../utilsStore';

const initialState = {
    userData: {},
    isLoading: false,
    haveTokenAuth: false,
};
//------------actions-------------
//---------------для работы с ассинхроном необходимо достать createAsyncThunk-------
export const getUser = createAsyncThunk(
    'user/getUser',
    async function (str, { getState, fulfillWithValue }) {
        try {
            return await userApi.getUserInfo();
        } catch {}
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async function (newUserData, { fulfillWithValue }) {
        try {
            if (newUserData.avatar) {
                return await userApi.changingAvatarUser({ avatar: newUserData.avatar });
            }
            return await userApi.changingDataUser({
                name: newUserData.name,
                about: newUserData.about,
            });
        } catch {}
    }
);

//------------slice// reducer-----------
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setHaveTokenAuth(state, action) {
            console.log(state.haveTokenAuth);
            state.haveTokenAuth = action.payload;
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
    reducers: {},
});

export const { setHaveTokenAuth } = userSlice.actions;
export default userSlice.reducer;

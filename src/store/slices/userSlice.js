import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../utils/apiUser';
import { forErrors, isLoadingData, showError } from '../utilsStore';

const initialState = {
    userData: {},
    isLoading: false,
    isAuth: false,
};
//------------actions-------------
//---------------для работы с ассинхроном необходимо достать createAsyncThunk-------
export const getUser = createAsyncThunk('user/getUser', async function () {
    try {
        return await userApi.getUserInfo();
    } catch {}
});

export const updateUser = createAsyncThunk('user/updateUser', async function (newUserData) {
    try {
        if (newUserData.avatar) {
            return await userApi.changingAvatarUser({ avatar: newUserData.avatar });
        }
        return await userApi.changingDataUser({
            name: newUserData.name,
            about: newUserData.about,
        });
    } catch {}
});

//------------slice// reducer-----------
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

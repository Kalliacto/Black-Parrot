import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../utils/apiUser';

const initialState = {
    data: {},
    isLoading: false,
};
//------------actions-------------
//---------------для работы с ассинхроном необходимо достать createAsyncThunk-------
export const getUser = createAsyncThunk('user/getUser', async function (str) {
    const data = await userApi.getUserInfo();
    return data;
});

export const updateUser = createAsyncThunk('user/updateUser', async function (newUserData) {
    const data = await userApi.changingDataUser(newUserData);
    return data;
});

// export const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', async function (newUserData) {
//     const data = await userApi.(newUserData);
//     return data;
// });

const showError = (error) => {
    return alert(error);
};

const isLoadingData = (data) => {
    return data.type.endsWith('pending');
};
const forErrors = (data) => {
    return data.type.endsWith('rejected');
};
//------------slice// reducer-----------
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        // builder.addCase(updateUserAvatar.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.data = action.payload;
        // });
        builder.addMatcher(isLoadingData, (state, action) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (state, action) => {
            showError(action.error.message);
        });
    },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;

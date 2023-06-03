import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../utils/apiUser';

const initialState = {
    userData: {},
    isLoading: false,
};
//------------actions-------------
//---------------для работы с ассинхроном необходимо достать createAsyncThunk-------
export const getUser = createAsyncThunk('user/getUser', async function (str, { getState }) {
    return await userApi.getUserInfo();
});

export const updateUser = createAsyncThunk('user/updateUser', async function (newUserData) {
    return await userApi.changingDataUser(newUserData);
});

// export const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', async function (newUserData) {
//     return await userApi.(newUserData);
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
            state.userData = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        });
        // builder.addCase(updateUserAvatar.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.data = action.payload;
        // });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
    reducers: {},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;

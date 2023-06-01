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

//------------slice// reducer-----------
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        // builder.addCase(getUser.rejected, (state, action) => {
        //     state.error = [...error, action.payload];
        // });
    },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;

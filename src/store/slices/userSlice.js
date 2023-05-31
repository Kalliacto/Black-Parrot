import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
    isLoading: false,
};

//------------slice// reduser-----------
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;

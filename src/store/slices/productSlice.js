import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    isLoading: false,
};

//------------slice// reduser-----------
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setList(state, action) {
            state.data = action.payload;
        },
    },
    extraReducers: {},
});

// export const setList  = productSlice.actions.setList; Более длинная запись чтобы достать конкретный action
export const { setList } = productSlice.actions;
export default productSlice.reducer;

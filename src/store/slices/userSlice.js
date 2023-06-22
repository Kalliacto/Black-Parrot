import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
import { userApi } from '../../utils/apiUser';
import { isLoadingData, showError } from '../utilsStore';
import { toast } from 'react-toastify';

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
    async function (newUserData, { fulfillWithValue, rejectWithValue, getState }) {
        try {
            const { user } = getState();
            if (newUserData.avatar !== user.userData.avatar) {
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
            toast.success('Ваши данные успешно изменены!');
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isRejected(updateUser), (state, action) => {
            state.isLoading = false;
            toast.error(action.payload.message);
        });
    },
});

export const { setIsAuth } = userSlice.actions;
export default userSlice.reducer;

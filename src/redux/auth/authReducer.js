import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '..';

const initialState = {
  user: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (user, thunkApi) => {
    const { data } = await axios.post(`${baseUrl}/auth/signup`, user);

    return data;
  }
);
export const signin = createAsyncThunk(
  'auth/signin',
  async (user, thunkApi) => {
    const { data } = await axios.post(`${baseUrl}/auth/signin`, user);

    return data;
  }
);
export const signout = createAsyncThunk(
  'auth/signout',
  async (user, thunkApi) => {
    const { data } = await axios.get(`${baseUrl}/auth/signout`);

    return data;
  }
);
export const getProfile = createAsyncThunk(
  'auth/profile',
  async (user, thunkApi) => {
    const { data } = await axios.get(`${baseUrl}/auth/profile`);
    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signout.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

const { actions, reducer } = authSlice;

export default reducer;

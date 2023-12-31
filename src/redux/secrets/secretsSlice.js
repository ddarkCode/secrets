import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '..';

const initialState = {
  secrets: [],
};

export const getAllSecrets = createAsyncThunk(
  'secrets/get_all_secrets',
  async (user, thunkApi) => {
    const { data } = await axios.get(`${baseUrl}/secrets`);

    return data;
  }
);

export const postSecret = createAsyncThunk(
  'secrets/post_new_secret',
  async (secret, thunkApi) => {
    const { data } = await axios.post(`${baseUrl}/secrets`, secret);

    return data;
  }
);

export const secretsSlice = createSlice({
  name: 'secrets',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllSecrets.fulfilled, (state, action) => {
      state.secrets = action.payload;
    });
    builder.addCase(postSecret.fulfilled, (state, action) => {
      state.secrets = state.secrets.concat(action.payload);
    });
  },
});

const { actions, reducer } = secretsSlice;

export default reducer;

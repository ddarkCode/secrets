import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authReducer';
import reducer from './secrets/secretsSlice';

export const baseUrl = 'https://secrets-3r6m.onrender.com/api';

export const createStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
      secrets: reducer,
    },
    preloadedState,
  });

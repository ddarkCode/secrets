import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authReducer';
import reducer from './secrets/secretsSlice';

export const baseUrl = 'http://localhost:4444/api';

export const createStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
      secrets: reducer,
    },
    preloadedState,
  });

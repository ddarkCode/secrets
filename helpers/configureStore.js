import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../src/redux/auth/authReducer';
import reducer from '../src/redux/secrets/secretsSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      secrets: reducer,
    },
  });
};

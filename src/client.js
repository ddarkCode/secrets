import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import Routes from './Routes';
import { createStore } from './redux';
const store = createStore(window.INITIAL_STATE);

hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(Routes)}</BrowserRouter>
  </Provider>
);

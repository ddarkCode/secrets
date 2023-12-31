import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch } from 'react-redux';

import { getProfile } from './redux/auth/authReducer';

function App({ route }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return <div>{renderRoutes(route.routes)}</div>;
}

export default App;

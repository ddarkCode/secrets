import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (Component) => {
  const Authenticated = (ownProps) => {
    const user = useSelector((state) => state.auth.user);
    switch (user) {
      case null:
        return <Redirect to={'/pages/signin'} />;
      default:
        return <Component {...ownProps} />;
    }
  };
  return Authenticated;
};

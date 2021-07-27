import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsAuthorizedSelector } from 'redux/userData/selectors';

const RedirectAuthorizedUserRoute = ({ redirectTo, children, ...props }) => {
  const isAuthorized = useSelector(getIsAuthorizedSelector);

  return (
    <Route {...props}>
      {isAuthorized ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
};

export default RedirectAuthorizedUserRoute;

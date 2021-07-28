import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

const RedirectAuthorizedUserRoute = ({ redirectTo, children, ...props }) => {
  const { isAuthorized } = useAuth();

  return (
    <Route {...props}>
      {isAuthorized ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
};

export default RedirectAuthorizedUserRoute;

import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ children, ...props }) {
  const { isAuthorized } = useAuth();

  return (
    <Route {...props}>
      {isAuthorized ? children : <Redirect to="/login" />}
    </Route>
  );
}

export default PrivateRoute;

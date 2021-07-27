import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsAuthorizedSelector } from 'redux/userData/selectors';

function PrivateRoute({ children, ...props }) {
  const isAuthorized = useSelector(getIsAuthorizedSelector);

  return (
    <Route {...props}>
      {isAuthorized ? children : <Redirect to="/login" />}
    </Route>
  );
}

export default PrivateRoute;

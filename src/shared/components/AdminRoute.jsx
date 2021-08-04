import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';
import Title from 'components/UI/Title/Title';

const AdminRoute = ({ children, ...props }) => {
  const { isAdmin, isAuthorized } = useAuth();

  return (
    <Route {...props}>
      {!isAuthorized ? (
        <Redirect to="/login" />
      ) : isAdmin ? (
        children
      ) : (
        <Title large centered>
          You're not admin
        </Title>
      )}
    </Route>
  );
};

export default AdminRoute;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoadingSelector,
  getMessageSelector,
} from 'redux/userInterface/selectors';
import Loader from 'components/UI/Loader/Loader';
import Login from 'pages/LoginPage';
import PrivateRoute from 'shared/components/PrivateRoute';
import HelloPage from 'pages/HelloPage/HelloPage';
import NotFoundPage from 'pages/NotFoundPage';
import TestsPage from 'pages/TestsPage';
import RegistrationPage from 'pages/RegistrationPage';
import RedirectAuthorizedUserRoute from 'shared/components/RedirectAuthorizedUserRoute';
import { checkIsAuthorized } from 'redux/userData/userDataSlice';
import Header from 'components/Header/Header';
import { useAuth } from 'hooks/useAuth';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import Alert from 'components/UI/Alert/Alert';
import { messageReceived } from 'redux/userInterface/userInterfaceSlice';
import { useCallback } from 'react';
import { getIsUserAuthorizationCheckedSelector } from 'redux/userData/selectors';

function App() {
  const dispatch = useDispatch();
  useComponentDidMount(() => dispatch(checkIsAuthorized()));
  const { user, logout, isAdmin } = useAuth();

  const isLoading = useSelector(getIsLoadingSelector);
  const isUserAuthorizationChecked = useSelector(
    getIsUserAuthorizationCheckedSelector
  );

  const message = useSelector(getMessageSelector);
  const closeMessage = useCallback(() => {
    dispatch(messageReceived({ message: '' }));
  }, [dispatch]);

  return (
    <Router>
      {isUserAuthorizationChecked && (
        <>
          <Header user={user} onLogout={logout} isAdmin={isAdmin} />
          <Switch>
            <Route path="/" exact>
              <HelloPage />
            </Route>

            <RedirectAuthorizedUserRoute
              path="/login"
              redirectTo="/tests"
              exact
            >
              <Login />
            </RedirectAuthorizedUserRoute>
            <RedirectAuthorizedUserRoute
              path="/signup"
              redirectTo="/tests"
              exact
            >
              <RegistrationPage />
            </RedirectAuthorizedUserRoute>
            <PrivateRoute path="/tests" exact>
              <TestsPage />
            </PrivateRoute>
            <NotFoundPage />
          </Switch>
        </>
      )}

      {isLoading && <Loader />}
      {message && <Alert message={message} close={closeMessage} />}
    </Router>
  );
}

export default React.memo(App);

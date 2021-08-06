import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoadingSelector,
  getMessageSelector,
} from 'redux/userInterface/selectors';
import { checkIsAuthorized } from 'redux/userData/userDataSlice';
import { messageReceived } from 'redux/userInterface/userInterfaceSlice';
import { getIsUserAuthorizationCheckedSelector } from 'redux/userData/selectors';
import Loader from 'components/UI/Loader/Loader';
import LoginPage from 'pages/LoginPage';
import PrivateRoute from 'shared/components/PrivateRoute';
import HelloPage from 'pages/HelloPage/HelloPage';
import NotFoundPage from 'pages/NotFoundPage';
import TestsPage from 'pages/TestsPage';
import RegistrationPage from 'pages/RegistrationPage';
import RedirectAuthorizedUserRoute from 'shared/components/RedirectAuthorizedUserRoute';
import Alert from 'components/UI/Alert/Alert';
import Header from 'components/Header/Header';
import TestPage from 'pages/TestPage';
import QuizPage from 'pages/QuizPage';
import AdminRoute from 'shared/components/AdminRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(checkIsAuthorized()), [dispatch]);

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
          <Header />
          <Switch>
            <Route path="/" exact>
              <HelloPage />
            </Route>

            <RedirectAuthorizedUserRoute
              path="/login"
              redirectTo="/tests"
              exact
            >
              <LoginPage />
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
            <AdminRoute path="/tests/:testId" exact>
              <TestPage />
            </AdminRoute>

            <PrivateRoute path="/quiz/:testId" exact>
              <QuizPage />
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

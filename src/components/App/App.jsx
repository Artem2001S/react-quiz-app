import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoadingSelector } from 'redux/userInterface/selectors';
import Loader from 'components/UI/Loader/Loader';
import Login from 'pages/LoginPage';
import PrivateRoute from 'shared/PrivateRoute';
import HelloPage from 'pages/HelloPage/HelloPage';
import NotFoundPage from 'pages/NotFoundPage';
import Dashboard from 'pages/Dashboard';
import Registration from 'pages/Registration';
import RedirectAuthorizedUserRoute from 'shared/RedirectAuthorizedUserRoute';
import { checkIsAuthorized } from 'redux/userData/userDataSlice';
import Header from 'components/Header/Header';

function App() {
  const isLoading = useSelector(getIsLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // get current user
    dispatch(checkIsAuthorized());
  }, [dispatch]);

  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact>
          <HelloPage />
        </Route>

        <RedirectAuthorizedUserRoute
          path="/login"
          redirectTo="/dashboard"
          exact
        >
          <Login />
        </RedirectAuthorizedUserRoute>
        <RedirectAuthorizedUserRoute
          path="/signup"
          redirectTo="/dashboard"
          exact
        >
          <Registration />
        </RedirectAuthorizedUserRoute>
        <PrivateRoute path="/dashboard" exact>
          <Dashboard />
        </PrivateRoute>
        <NotFoundPage />
      </Switch>

      {isLoading && <Loader />}
    </Router>
  );
}

export default React.memo(App);

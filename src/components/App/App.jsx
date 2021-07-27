import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoadingSelector } from 'redux/userInterface/selectors';
import Loader from 'components/UI/Loader/Loader';
import Login from 'pages/LoginPage';
import PrivateRoute from 'shared/PrivateRoute';
import HelloPage from 'pages/HelloPage/HelloPage';
import NotFoundPage from 'pages/NotFoundPage';
import Dashboard from 'pages/Dashboard';
import Registration from 'pages/Registration';

function App() {
  const isLoading = useSelector(getIsLoadingSelector);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HelloPage />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Registration />
        </Route>
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

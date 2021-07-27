import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoadingSelector } from 'redux/userInterface/selectors';
import Loader from 'components/UI/Loader/Loader';
import Login from 'pages/Login';
import Home from 'pages/Home';
import PrivateRoute from 'shared/PrivateRoute';

function App() {
  const isLoading = useSelector(getIsLoadingSelector);

  return (
    <Router>
      <Link to="/">Protected</Link>
      <Link to="/login">Login page</Link>

      <Switch>
        <PrivateRoute path="/" exact>
          <Home />
        </PrivateRoute>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>

      {isLoading && <Loader />}
    </Router>
  );
}

export default App;

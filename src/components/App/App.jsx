import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoadingSelector } from 'redux/userInterface/selectors';
import Loader from 'components/UI/Loader/Loader';
import Login from 'pages/Login';
import PrivateRoute from 'shared/PrivateRoute';
import HelloPage from 'pages/HelloPage/HelloPage';

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
        <PrivateRoute path="/dashboard" exact>
          Private
        </PrivateRoute>
      </Switch>

      {isLoading && <Loader />}
    </Router>
  );
}

export default App;

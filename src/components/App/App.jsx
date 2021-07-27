import Loader from 'components/UI/Loader/Loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsLoadingSelector } from 'redux/userInterface/selectors';

function App() {
  const isLoading = useSelector(getIsLoadingSelector);
  return <div>{isLoading && <Loader />}App</div>;
}

export default App;

import Input from 'components/UI/Input/Input';
import Loader from 'components/UI/Loader/Loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsLoadingSelector } from 'redux/userInterface/selectors';

function App() {
  const isLoading = useSelector(getIsLoadingSelector);

  return (
    <div>
      {isLoading && <Loader />}
      <div>
        <Input value="dsa" id={1} label="label" />
      </div>
    </div>
  );
}

export default App;

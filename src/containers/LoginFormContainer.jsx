import React, { useState, useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Container from 'components/UI/Container/Container';
import Form from 'components/Form/Form';
import { userLogin } from 'redux/userData/userDataSlice';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([
    {
      id: nanoid(),
      label: 'Username:',
      name: 'userName',
      value: '',
      validationData: { isRequired: true },
    },
    {
      id: nanoid(),
      label: 'Password:',
      name: 'password',
      autoComplete: 'off',
      value: '',
      type: 'password',
      validationData: { isRequired: true },
    },
  ]);

  const changeInputValue = useCallback(
    (id, value) => {
      setInputs(
        inputs.map((input) => (input.id === id ? { ...input, value } : input))
      );
    },
    [inputs]
  );

  const formSubmitHandler = useCallback(() => {
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <Container centered fullScreen>
      <Form
        submitBtnText="Login"
        inputs={inputs}
        onInputChange={changeInputValue}
        onSubmit={formSubmitHandler}
      />
    </Container>
  );
};

export default React.memo(LoginFormContainer);

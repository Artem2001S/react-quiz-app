import React, { useState, useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Container from 'components/UI/Container/Container';
import Form from 'components/Form/Form';
import { userLogin } from 'redux/userData/userDataSlice';
import { validateInputs } from 'shared/helpers';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [inputs, setInputs] = useState([
    {
      id: nanoid(),
      label: 'Username:',
      name: 'username',
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
    const validationErrors = validateInputs(inputs);

    if (validationErrors.length) {
      setErrors(validationErrors);
    } else {
      const data = { username: inputs[0].value, password: inputs[1].value };
      dispatch(userLogin(data));

      setErrors([]);
    }
  }, [dispatch, inputs]);

  return (
    <Container centered fullScreen>
      <Form
        submitBtnText="Login"
        inputs={inputs}
        title="Sign in"
        errors={errors}
        onInputChange={changeInputValue}
        onSubmit={formSubmitHandler}
      />
    </Container>
  );
};

export default React.memo(LoginFormContainer);

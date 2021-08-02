import React, { useState, useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userLogin } from 'redux/userData/userDataSlice';
import { validateInputs } from 'shared/helpers';
import { useInputs } from 'hooks/useInputs';
import Container from 'components/UI/Container/Container';
import Form from 'components/Form/Form';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const inputsArray = [
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
  ];

  const { inputs } = useInputs(inputsArray);

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
    <Container centered>
      <Form
        submitBtnText="Login"
        inputs={inputs}
        title="Sign in"
        errors={errors}
        onSubmit={formSubmitHandler}
      />
    </Container>
  );
};

export default React.memo(LoginFormContainer);

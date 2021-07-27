import React, { useState, useCallback } from 'react';
import Form from 'components/Form/Form';
import { nanoid } from '@reduxjs/toolkit';
import Container from 'components/UI/Container/Container';

const LoginFormContainer = () => {
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

  return (
    <Container centered fullScreen>
      <Form
        submitBtnText="Login"
        inputs={inputs}
        onInputChange={changeInputValue}
      />
    </Container>
  );
};

export default React.memo(LoginFormContainer);

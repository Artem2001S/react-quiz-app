import React, { useState, useCallback } from 'react';
import Form from 'components/Form/Form';
import Container from 'components/UI/Container/Container';
import { nanoid } from '@reduxjs/toolkit';
import { useInputs } from 'hooks/useInputs';
import { validateInputs } from 'shared/helpers';
import { useDispatch } from 'react-redux';
import { userSignUp } from 'redux/userData/userDataSlice';

const RegistrationFormContainer = () => {
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
    {
      id: nanoid(),
      label: 'Repeat password:',
      name: 'repeatPassword',
      autoComplete: 'off',
      value: '',
      type: 'password',
      validationData: { isRequired: true },
    },
    {
      id: nanoid(),
      type: 'checkbox',
      label: 'Register as admin',
      name: 'isAdmin',
      checked: false,
    },
  ];

  const { inputs } = useInputs(inputsArray);

  const formSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const [
        { value: userName },
        { value: password },
        { value: passwordRepeat },
        { checked: isAdmin },
      ] = inputs;

      if (password !== passwordRepeat) {
        setErrors(['Passwords should be equal']);
        return;
      }

      const validationErrors = validateInputs(inputs);
      if (validationErrors.length) {
        setErrors(validationErrors);
      } else {
        if (errors) {
          setErrors([]);
        }

        dispatch(userSignUp({}));
      }
    },
    [dispatch, errors, inputs]
  );

  return (
    <Container centered>
      <Form
        errors={errors}
        inputs={inputs}
        submitBtnText="Sign up"
        title="Registration"
        onSubmit={formSubmitHandler}
      />
    </Container>
  );
};

export default React.memo(RegistrationFormContainer);

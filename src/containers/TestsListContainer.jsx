import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTestsIsFetchedSelector,
  getTestsListSelector,
} from 'redux/tests/selectors';
import TestsList from 'components/TestsList/TestsList';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { createNewTest, fetchTests } from 'redux/tests/testsSlice';
import { useAuth } from 'hooks/useAuth';
import { useInputs } from 'hooks/useInputs';
import { nanoid } from '@reduxjs/toolkit';
import Form from 'components/Form/Form';
import Container from 'components/UI/Container/Container';
import { validateInputs } from 'shared/helpers';

const TestsListContainer = () => {
  const dispatch = useDispatch();
  useComponentDidMount(() => dispatch(fetchTests()));

  const isFetched = useSelector(getTestsIsFetchedSelector);
  const tests = useSelector(getTestsListSelector);
  const { isAdmin } = useAuth();

  const [errors, setErrors] = useState([]);
  const { inputs, resetInputs } = useInputs([
    {
      id: nanoid(),
      label: 'Title:',
      name: 'title',
      value: '',
      validationData: { isRequired: true },
    },
  ]);

  const newTodoFormSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const validationErrors = validateInputs(inputs);
      if (validationErrors.length) {
        setErrors(validationErrors);
      } else {
        setErrors([]);
        const [{ value: testTitle }] = inputs;
        dispatch(createNewTest({ title: testTitle }));
        resetInputs();
      }
    },
    [dispatch, inputs, resetInputs]
  );

  return (
    <>
      <Container centered>
        {isAdmin && (
          <Form
            title="New test"
            inputs={inputs}
            errors={errors}
            submitBtnText="Create test"
            onSubmit={newTodoFormSubmitHandler}
          />
        )}
      </Container>
      {isFetched ? <TestsList tests={tests} isAdmin={isAdmin} /> : null}
    </>
  );
};

export default React.memo(TestsListContainer);

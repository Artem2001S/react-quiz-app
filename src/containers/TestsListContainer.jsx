import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTestsCountSelector,
  getTestsCurrentPageSelector,
  getTestsIsFetchedSelector,
  getTestsListSelector,
  getTotalPagesSelector,
} from 'redux/tests/selectors';
import { validateInputs } from 'shared/helpers';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { createNewTest, deleteTest, fetchTests } from 'redux/tests/testsSlice';
import { useAuth } from 'hooks/useAuth';
import { useInputs } from 'hooks/useInputs';
import { nanoid } from '@reduxjs/toolkit';
import TestsList from 'components/TestsList/TestsList';
import Form from 'components/Form/Form';
import Container from 'components/UI/Container/Container';
import PaginationControl from 'components/PaginationControl/PaginationControl';

const TestsListContainer = () => {
  const dispatch = useDispatch();
  useComponentDidMount(() => dispatch(fetchTests()));

  const isFetched = useSelector(getTestsIsFetchedSelector);
  const tests = useSelector(getTestsListSelector);
  const testsCount = useSelector(getTestsCountSelector);
  const pagesCount = useSelector(getTotalPagesSelector);
  const currentPage = useSelector(getTestsCurrentPageSelector);

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
        dispatch(createNewTest({ title: testTitle, currentPage }));
        resetInputs();
      }
    },
    [currentPage, dispatch, inputs, resetInputs]
  );

  const handleDeleteTestBtnClick = useCallback(
    (id) => {
      dispatch(deleteTest({ id, currentPage }));
    },
    [dispatch, currentPage]
  );

  const handlePaginationChanged = useCallback(
    (pageNum) => {
      dispatch(fetchTests({ page: pageNum }));
    },
    [dispatch]
  );

  return isFetched ? (
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
      <TestsList
        tests={tests}
        testsCount={testsCount}
        isAdmin={isAdmin}
        onDelete={handleDeleteTestBtnClick}
      />
      {tests.length > 0 && (
        <PaginationControl
          currentPage={currentPage}
          pagesCount={pagesCount}
          onPaginationChanged={handlePaginationChanged}
        />
      )}
    </>
  ) : null;
};

export default React.memo(TestsListContainer);

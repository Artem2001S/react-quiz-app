import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTestsCountSelector,
  getTestsCurrentPageSelector,
  getTestsIsFetchedSelector,
  getTestsListSelector,
  getTestsSearchValue,
  getTestsSortTypeSelector,
  getTotalPagesSelector,
} from 'redux/tests/selectors';
import { validateInputs } from 'shared/helpers';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { createNewTest, deleteTest, fetchTests } from 'redux/tests/testsSlice';
import { useAuth } from 'hooks/useAuth';
import { useInputs } from 'hooks/useInputs';
import { nanoid } from '@reduxjs/toolkit';
import { testsListSortTypes } from 'shared/constants';
import TestsList from 'components/TestsList/TestsList';
import Form from 'components/Form/Form';
import Container from 'components/UI/Container/Container';
import PaginationControl from 'components/PaginationControl/PaginationControl';

const TestsListContainer = () => {
  const dispatch = useDispatch();

  const isFetched = useSelector(getTestsIsFetchedSelector);
  const tests = useSelector(getTestsListSelector);
  const testsCount = useSelector(getTestsCountSelector);
  const pagesCount = useSelector(getTotalPagesSelector);
  const currentPage = useSelector(getTestsCurrentPageSelector);
  const sortType = useSelector(getTestsSortTypeSelector);
  const searchValue = useSelector(getTestsSearchValue);

  useComponentDidMount(() =>
    dispatch(fetchTests({ sort: sortType, page: currentPage, searchValue }))
  );

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

  const newTestFormSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const validationErrors = validateInputs(inputs);
      if (validationErrors.length) {
        setErrors(validationErrors);
      } else {
        setErrors([]);
        const [{ value: testTitle }] = inputs;
        dispatch(
          createNewTest({
            title: testTitle,
            currentPage,
            sort: sortType,
            searchValue,
          })
        );
        resetInputs();
      }
    },
    [currentPage, dispatch, inputs, resetInputs, searchValue, sortType]
  );

  const handleDeleteTestBtnClick = useCallback(
    (id) => {
      dispatch(deleteTest({ id, currentPage, sort: sortType, searchValue }));
    },
    [dispatch, currentPage, sortType, searchValue]
  );

  const handlePaginationChanged = useCallback(
    (pageNum) => {
      dispatch(fetchTests({ page: pageNum, sort: sortType, searchValue }));
    },
    [dispatch, searchValue, sortType]
  );

  const handleToggleSortBtnClick = useCallback(() => {
    dispatch(
      fetchTests({
        page: currentPage,
        searchValue,
        sort:
          sortType === testsListSortTypes.createdAtAsc
            ? testsListSortTypes.createdAtDesc
            : testsListSortTypes.createdAtAsc,
      })
    );
  }, [currentPage, dispatch, searchValue, sortType]);

  const onSearchFormSubmit = useCallback(
    (newSearchValue) => {
      dispatch(
        fetchTests({
          page: currentPage,
          sort: sortType,
          searchValue: newSearchValue,
        })
      );
    },
    [currentPage, dispatch, sortType]
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
            onSubmit={newTestFormSubmitHandler}
          />
        )}
      </Container>
      <TestsList
        tests={tests}
        testsCount={testsCount}
        isAdmin={isAdmin}
        onDelete={handleDeleteTestBtnClick}
        onSortChange={handleToggleSortBtnClick}
        onSearchFormSubmit={onSearchFormSubmit}
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

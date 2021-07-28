import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTestsIsFetchedSelector,
  getTestsListSelector,
} from 'redux/tests/selectors';
import TestsList from 'components/TestsList/TestsList';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { fetchTests } from 'redux/tests/testsSlice';
import { useAuth } from 'hooks/useAuth';

const TestsListContainer = () => {
  const dispatch = useDispatch();
  const isFetched = useSelector(getTestsIsFetchedSelector);
  const tests = useSelector(getTestsListSelector);
  const { isAdmin } = useAuth();

  useComponentDidMount(() => dispatch(fetchTests()));

  return isFetched ? <TestsList tests={tests} isAdmin={isAdmin} /> : null;
};

export default TestsListContainer;

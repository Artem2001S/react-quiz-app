import React from 'react';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTest } from 'redux/currentTest/currentTestSlice';
import {
  getCurrentTestSelector,
  getIsCurrentTestFetchedSelector,
} from 'redux/currentTest/selectors';
import Quiz from 'components/Quiz/Quiz';

const QuizContainer = ({ testId }) => {
  const dispatch = useDispatch();
  const currentTest = useSelector(getCurrentTestSelector);
  const isTestFetched = useSelector(getIsCurrentTestFetchedSelector);

  useComponentDidMount(() => {
    dispatch(fetchTest({ testId }));
  });

  return isTestFetched ? <Quiz test={currentTest} /> : null;
};

export default React.memo(QuizContainer);

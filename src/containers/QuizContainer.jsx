import React from 'react';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTest } from 'redux/currentTest/currentTestSlice';
import {
  getCurrentTestSelector,
  getIsCurrentTestFetchedSelector,
} from 'redux/currentTest/selectors';
import PropTypes from 'prop-types';
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

QuizContainer.propTypes = {
  testId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(QuizContainer);

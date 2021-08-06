import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchTest({ testId }));
  }, [dispatch, testId]);

  return isTestFetched ? <Quiz test={currentTest} /> : null;
};

QuizContainer.propTypes = {
  testId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(QuizContainer);

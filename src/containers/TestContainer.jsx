import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTest } from 'redux/currentTest/currentTestSlice';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import {
  getCurrentTestSelector,
  getIsCurrentTestFetchedSelector,
} from 'redux/currentTest/selectors';
import Test from 'components/Test/Test';
import Title from 'components/UI/Title/Title';
import Container from 'components/UI/Container/Container';

const TestContainer = ({ testId }) => {
  const dispatch = useDispatch();
  useComponentDidMount(() => dispatch(fetchTest({ testId })));

  const currentTest = useSelector(getCurrentTestSelector);
  const isTestFetched = useSelector(getIsCurrentTestFetchedSelector);

  return isTestFetched ? (
    <>
      {currentTest && isTestFetched ? (
        <Test />
      ) : (
        <Container>
          <Title large>Test not found</Title>
        </Container>
      )}
    </>
  ) : null;
};

export default React.memo(TestContainer);

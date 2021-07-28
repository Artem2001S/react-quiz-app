import React from 'react';
import { useParams } from 'react-router-dom';
import TestContainer from 'containers/TestContainer';

const TestPage = () => {
  const { testId } = useParams();
  return <TestContainer testId={testId} />;
};

export default React.memo(TestPage);

import React from 'react';
import QuizContainer from 'containers/QuizContainer';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { testId } = useParams();

  return <QuizContainer testId={testId} />;
};

export default React.memo(QuizPage);

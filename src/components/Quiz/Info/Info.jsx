import Title from 'components/UI/Title/Title';
import React from 'react';
import { useQuizCtx } from '../QuizContext';

const Info = () => {
  const { test, questions } = useQuizCtx();

  return (
    <>
      <Title centered large>
        {test.title}
      </Title>
      <Title small centered>
        Test created at: {new Date(test.created_at).toLocaleDateString()}
      </Title>
      <Title small centered>
        Questions count: {questions.length}
      </Title>
    </>
  );
};

export default React.memo(Info);

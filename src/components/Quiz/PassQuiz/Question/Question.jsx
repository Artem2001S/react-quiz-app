import Title from 'components/UI/Title/Title';
import React from 'react';
import { useQuizCtx } from '../../QuizContext';

const Question = () => {
  const { currentQuestion, currentQuestionIndex } = useQuizCtx();

  return (
    <Title small>
      {currentQuestionIndex + 1}. {currentQuestion.title}
    </Title>
  );
};

export default React.memo(Question);

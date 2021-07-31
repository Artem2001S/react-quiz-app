import React from 'react';
import { useQuizCtx } from 'components/Quiz/QuizContext';
import { questionTypes } from 'shared/constants';
import Number from './Number/Number';
import Select from './Select/Select';

const Answers = () => {
  const { currentQuestion } = useQuizCtx();

  return currentQuestion.question_type === questionTypes.number ? (
    <Answers.Number />
  ) : (
    <Answers.Select />
  );
};

Answers.Number = Number;
Answers.Select = Select;

export default React.memo(Answers);

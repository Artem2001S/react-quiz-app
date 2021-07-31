import React from 'react';
import { useQuizCtx } from '../QuizContext';
import Question from './Question/Question';
import Answers from './Answers/Answers';
import Result from './Result/Result';

const PassQuiz = () => {
  const { isQuizFinished } = useQuizCtx();

  return isQuizFinished ? (
    <PassQuiz.Result />
  ) : (
    <>
      <PassQuiz.Question />
      <PassQuiz.Answers />
    </>
  );
};

PassQuiz.Question = Question;
PassQuiz.Answers = Answers;
PassQuiz.Result = Result;

export default React.memo(PassQuiz);

import React from 'react';
import { useQuizCtx } from '../QuizContext';
import Question from './Question/Question';
import Answers from './Answers/Answers';
import Result from './Result/Result';
import Button from 'components/UI/Button/Button';
import classes from './PassQuiz.module.scss';
import Modal from 'components/UI/Modal/Modal';

const PassQuiz = () => {
  const { isQuizFinished, finishQuiz } = useQuizCtx();

  return isQuizFinished ? (
    <Modal isVisible={true} showCloseBtn={false}>
      <PassQuiz.Result />
    </Modal>
  ) : (
    <>
      <PassQuiz.Question />
      <PassQuiz.Answers />
      <Button className={classes.FinishQuizBtn} onClick={finishQuiz}>
        Finish Quiz
      </Button>
    </>
  );
};

PassQuiz.Question = Question;
PassQuiz.Answers = Answers;
PassQuiz.Result = Result;

export default React.memo(PassQuiz);

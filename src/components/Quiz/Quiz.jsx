import React, { useState, useCallback, useMemo } from 'react';
import { QuizContextProvider } from './QuizContext';
import { getValidQuestions } from 'shared/helpers';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import Info from './Info/Info';
import Button from 'components/UI/Button/Button';
import PassQuiz from './PassQuiz/PassQuiz';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import classes from './Quiz.module.scss';

const Quiz = ({ test }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const startQuizBtnClickHandler = useCallback(() => setQuizStarted(true), []);
  const validQuestionsCount = useMemo(
    () => test && getValidQuestions(test.questions),
    [test]
  )?.length;

  if (!test) {
    return (
      <Title centered large>
        Test not found
      </Title>
    );
  }

  return (
    <Container centered>
      <QuizContextProvider test={test}>
        {validQuestionsCount === 0 ? (
          <>
            <Title small centered>
              You can't start this quiz,because there are no questions.
            </Title>
          </>
        ) : (
          <>
            {quizStarted ? (
              <Quiz.PassQuiz />
            ) : (
              <>
                <Quiz.Info />
                <Button onClick={startQuizBtnClickHandler}>Start Quiz</Button>
              </>
            )}
          </>
        )}
        <ButtonLink className={classes.BackBtn} to={`/tests/${test.id}`}>
          Back to test
        </ButtonLink>
      </QuizContextProvider>
    </Container>
  );
};

Quiz.Info = Info;
Quiz.PassQuiz = PassQuiz;

export default React.memo(Quiz);

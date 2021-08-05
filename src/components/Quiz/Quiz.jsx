import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { QuizContextProvider } from './QuizContext';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import Info from './Info/Info';
import Button from 'components/UI/Button/Button';
import PassQuiz from './PassQuiz/PassQuiz';

const Quiz = ({ test }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const startQuizBtnClickHandler = useCallback(() => setQuizStarted(true), []);

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
        {test.questions.length === 0 ? (
          <>
            <Title small centered>
              You can't start this quiz,because there are no questions.
            </Title>
          </>
        ) : quizStarted ? (
          <Quiz.PassQuiz />
        ) : (
          <>
            <Quiz.Info />
            <Button onClick={startQuizBtnClickHandler}>Start Quiz</Button>
          </>
        )}
      </QuizContextProvider>
    </Container>
  );
};

Quiz.Info = Info;
Quiz.PassQuiz = PassQuiz;

Quiz.propTypes = {
  test: PropTypes.object,
};

export default React.memo(Quiz);

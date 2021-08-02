import React, { useContext, useState, useCallback, useMemo } from 'react';
import { questionTypes } from 'shared/constants';
import { getValidQuestions, isArraysEqual } from 'shared/helpers';

const QuizContext = React.createContext();

export const QuizContextProvider = ({ children, test }) => {
  // select questions which have 2 or more answers
  const questions = useMemo(() => getValidQuestions(test.questions), [test]);

  const questionsCount = questions.length;

  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const nextQuestion = useCallback(
    (questionType, answer) => {
      switch (questionType) {
        case questionTypes.single:
          const [selectedIndex] = answer;
          const selectedAnswer = currentQuestion.answers[selectedIndex];
          selectedAnswer?.is_right &&
            setCorrectAnswersCount(correctAnswersCount + 1);
          break;
        case questionTypes.multiple:
          const selectedIndexes = answer;
          const rightAnswersIndexes = currentQuestion.answers.reduce(
            (rightAnswersIndexes, answer, index) =>
              answer.is_right
                ? [...rightAnswersIndexes, index]
                : rightAnswersIndexes,
            []
          );
          isArraysEqual(selectedIndexes, rightAnswersIndexes) &&
            setCorrectAnswersCount(correctAnswersCount + 1);
          break;
        case questionTypes.number:
          const correctAnswer = currentQuestion.answer;
          correctAnswer === Number(answer) &&
            setCorrectAnswersCount(correctAnswersCount + 1);
          break;
        default:
          break;
      }

      questionsCount === currentQuestionIndex + 1
        ? setIsQuizFinished(true)
        : setCurrentQuestionIndex(currentQuestionIndex + 1);
    },
    [correctAnswersCount, currentQuestion, currentQuestionIndex, questionsCount]
  );

  const reset = useCallback(() => {
    setCorrectAnswersCount(0);
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        test,
        questions,
        questionsCount,
        correctAnswersCount,
        currentQuestionIndex,
        currentQuestion,
        isQuizFinished,
        isLastQuestion: questionsCount - currentQuestionIndex === 1,
        nextQuestion,
        reset,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizCtx = () => useContext(QuizContext);

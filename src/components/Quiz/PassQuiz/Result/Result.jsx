import React from 'react';
import { useQuizCtx } from 'components/Quiz/QuizContext';
import Button from 'components/UI/Button/Button';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import Title from 'components/UI/Title/Title';
import classes from './Result.module.scss';

const Result = () => {
  const { correctAnswersCount, reset, questionsCount, test } = useQuizCtx();

  return (
    <div>
      <Title medium centered>
        Test: {test.title}
      </Title>
      <Title small>
        Your result is: {correctAnswersCount}/{questionsCount}
      </Title>
      <div className={classes.Footer}>
        <Button onClick={reset}>Try again</Button>
        <ButtonLink to={`/tests/${test.id}`}>Open test page</ButtonLink>
        <ButtonLink to={`/tests`}>Go to tests</ButtonLink>
      </div>
    </div>
  );
};

export default React.memo(Result);

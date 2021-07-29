import React from 'react';
import Answer from './Answer/Answer';
import classes from './Answers.module.scss';

const Answers = ({ questionId, questionType, answers, answer }) => {
  return (
    <div className={classes.Answers}>
      {questionType === 'number' ? (
        <div>{answer}</div>
      ) : (
        answers.map((answer) => (
          <Answer key={answer.id} answer={answer} questionId={questionId} />
        ))
      )}
    </div>
  );
};

export default React.memo(Answers);

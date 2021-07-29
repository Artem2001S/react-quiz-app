import React from 'react';
import Title from 'components/UI/Title/Title';
import Question from './Question/Question';
import classes from './Questions.module.scss';

const Questions = ({ testId, questions }) => {
  return (
    <div className={classes.Questions}>
      <Title medium>Questions</Title>
      <div className={classes.QuestionsList}>
        {questions.map((question) => (
          <Question key={question.id} testId={testId} question={question} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Questions);

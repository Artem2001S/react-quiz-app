import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/UI/Title/Title';
import Question from './Question/Question';
import classes from './Questions.module.scss';

const Questions = ({ testId, questions }) => (
  <div className={classes.Questions}>
    <Title medium>Questions</Title>
    <div className={classes.QuestionsList}>
      {questions.map((question) => (
        <Question key={question.id} testId={testId} question={question} />
      ))}
    </div>
  </div>
);

Questions.propTypes = {
  testId: PropTypes.number,
  questions: PropTypes.array,
};

export default React.memo(Questions);

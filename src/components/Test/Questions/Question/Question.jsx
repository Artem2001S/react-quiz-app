import React, { useState } from 'react';
import Answer from './Answer/Answer';
import Title from 'components/UI/Title/Title';
import classes from './Question.module.scss';

const Question = ({ question, testId }) => {
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);

  return (
    <div className={classes.Question}>
      <div className={classes.Header}>
        <div
          className={classes.ToggleBtn}
          onClick={() => setIsAnswersVisible(!isAnswersVisible)}
        >
          {isAnswersVisible ? '⮝' : '⮟'}
        </div>
        <Title small>{question.title}</Title>
      </div>
      {isAnswersVisible && (
        <div className={classes.Answers}>
          {question.question_type === 'number' ? (
            <div>{question.answer}</div>
          ) : (
            question.answers.map((answer) => (
              <Answer key={answer.id} answer={answer} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Question);

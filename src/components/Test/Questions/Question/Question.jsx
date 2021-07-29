import React, { useState } from 'react';
import Answer from './Answer/Answer';
import classes from './Question.module.scss';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import { useAuth } from 'hooks/useAuth';
import Title from 'components/UI/Title/Title';

const Question = ({ question, testId }) => {
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <div className={classes.Question}>
      <div className={classes.Header}>
        <div
          className={classes.ToggleBtn}
          onClick={() => setIsAnswersVisible(!isAnswersVisible)}
        >
          {isAnswersVisible ? '⮝' : '⮟'}
        </div>
        {isAdmin ? (
          <EditableInput
            className={classes.QuestionTitle}
            initialValue={question.title}
            onSubmit={() => {}}
          />
        ) : (
          <Title small>{question.title}</Title>
        )}
      </div>
      {isAnswersVisible && (
        <div className={classes.Answers}>
          {question.question_type === 'number' ? (
            <div>{question.answer}</div>
          ) : (
            question.answers.map((answer) => (
              <Answer
                key={answer.id}
                answer={answer}
                questionId={question.id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Question);

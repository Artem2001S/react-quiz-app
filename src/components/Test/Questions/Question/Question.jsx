import React, { useState, useCallback } from 'react';
import Answer from './Answer/Answer';
import classes from './Question.module.scss';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import { useAuth } from 'hooks/useAuth';
import Title from 'components/UI/Title/Title';
import { useTestCtx } from 'components/Test/TestContext';
import Button from 'components/UI/Button/Button';

const Question = ({ question, testId }) => {
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);
  const { isAdmin } = useAuth();

  const { onQuestionTitleUpdate, onQuestionDelete } = useTestCtx();

  const handleTitleUpdate = useCallback(
    (newTitle) => {
      onQuestionTitleUpdate(question.id, newTitle, question.question_type);
    },
    [onQuestionTitleUpdate, question]
  );

  const handleQuestionDelete = useCallback(() => {
    onQuestionDelete(question.id);
  }, [onQuestionDelete, question]);

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
          <div className={classes.HeaderContent}>
            <EditableInput
              className={classes.QuestionTitle}
              initialValue={question.title}
              onSubmit={handleTitleUpdate}
            />
            <Button small danger onClick={handleQuestionDelete}>
              &times;
            </Button>
          </div>
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

import React, { useState, useCallback } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useTestCtx } from 'components/Test/TestContext';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import Title from 'components/UI/Title/Title';
import Button from 'components/UI/Button/Button';
import Answers from './Answers/Answers';
import classes from './Question.module.scss';

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
            >
              <Title small>{question.title}</Title>
            </EditableInput>
            <Button small danger onClick={handleQuestionDelete}>
              &times;
            </Button>
          </div>
        ) : (
          <Title small>{question.title}</Title>
        )}
      </div>
      {isAnswersVisible && <Answers question={question} />}
    </div>
  );
};

export default React.memo(Question);

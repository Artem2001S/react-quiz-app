import classNames from 'classnames';
import { useTestCtx } from 'components/Test/TestContext';
import Button from 'components/UI/Button/Button';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useCallback } from 'react';
import classes from './Answer.module.scss';

const Answer = ({
  answer,
  index,
  questionId,
  onDragStart,
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  const { isAdmin } = useAuth();
  const { onAnswerDelete, onAnswerIsRightToggle, onAnswerTextChanged } =
    useTestCtx();

  const handleDeleteBtnClick = useCallback(() => {
    onAnswerDelete(answer.id, questionId);
  }, [answer, onAnswerDelete, questionId]);

  const handleToggleIsRightBtnClick = useCallback(() => {
    onAnswerIsRightToggle(answer.id, answer, questionId);
  }, [answer, onAnswerIsRightToggle, questionId]);

  const toggleBtnClasses = classNames({
    [classes.RightAnswerToggleBtn]: answer.is_right,
    [classes.NotRightAnswerToggleBtn]: !answer.is_right,
  });

  const handleAnswerTextChanged = useCallback(
    (newText) => {
      onAnswerTextChanged(answer.id, answer, newText);
    },
    [answer, onAnswerTextChanged]
  );

  const handleDragStart = useCallback(
    (e) => onDragStart(e, answer, index),
    [answer, index, onDragStart]
  );

  const handleDrop = useCallback((e) => onDrop(e, index), [index, onDrop]);

  return (
    <div
      className={classes.Answer}
      draggable={true}
      onDragStart={handleDragStart}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={handleDrop}
    >
      {isAdmin ? (
        <EditableInput
          initialValue={answer.text}
          onSubmit={handleAnswerTextChanged}
        >
          <div className={classes.Text}>{answer.text}</div>
        </EditableInput>
      ) : (
        <div className={classes.Text}>{answer.text}</div>
      )}

      {isAdmin && (
        <div className={classes.Actions}>
          <Button
            className={toggleBtnClasses}
            title="Toggle is answer right"
            small
            onClick={handleToggleIsRightBtnClick}
          >
            &#10003;
          </Button>
          <Button
            small
            danger
            title="Delete this answer"
            onClick={handleDeleteBtnClick}
          >
            &times;
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Answer);

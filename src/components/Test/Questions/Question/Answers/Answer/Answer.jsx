import classNames from 'classnames';
import { useTestCtx } from 'components/Test/TestContext';
import Button from 'components/UI/Button/Button';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useCallback } from 'react';
import classes from './Answer.module.scss';

const Answer = ({ answer, questionId }) => {
  const { isAdmin } = useAuth();
  const { onAnswerDelete, onAnswerIsRightToggle, onAnswerTextChanged } =
    useTestCtx();

  const handleDeleteBtnClick = useCallback(() => {
    onAnswerDelete(answer.id, questionId);
  }, [answer, onAnswerDelete, questionId]);

  const handleToggleIsRightBtnClick = useCallback(() => {
    onAnswerIsRightToggle(answer.id, answer);
  }, [answer, onAnswerIsRightToggle]);

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

  return (
    <div className={classes.Answer}>
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

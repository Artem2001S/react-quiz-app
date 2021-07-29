import classNames from 'classnames';
import { useTestCtx } from 'components/Test/TestContext';
import Button from 'components/UI/Button/Button';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useCallback } from 'react';
import classes from './Answer.module.scss';

const Answers = ({ answer, questionId }) => {
  const { isAdmin } = useAuth();
  const { onAnswerDelete } = useTestCtx();

  const handleDeleteBtnClick = useCallback(() => {
    onAnswerDelete(answer.id, questionId);
  }, [answer, onAnswerDelete, questionId]);

  return (
    <div className={classes.Answer}>
      <div className={classes.Text}>{answer.text}</div>
      {isAdmin && (
        <div className={classes.Actions}>
          <Button
            className={classNames({
              [classes.RightAnswerToggleBtn]: answer.is_right,
              [classes.NotRightAnswerToggleBtn]: !answer.is_right,
            })}
            title="Toggle is answer right"
            small
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

export default React.memo(Answers);

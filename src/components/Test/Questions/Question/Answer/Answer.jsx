import classNames from 'classnames';
import Button from 'components/UI/Button/Button';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import classes from './Answer.module.scss';

const Answers = ({ answer }) => {
  const { isAdmin } = useAuth();

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
          <Button small danger title="Delete this answer">
            &times;
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Answers);

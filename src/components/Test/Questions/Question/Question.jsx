import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from 'hooks/useAuth';
import { getQuestionWarnings } from 'shared/helpers';
import { useTestCtx } from 'components/Test/TestContext';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import Title from 'components/UI/Title/Title';
import Answers from './Answers/Answers';
import Button from 'components/UI/Button/Button';
import classes from './Question.module.scss';
import classNames from 'classnames';

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

  const toggleAnswersVisible = useCallback(
    () => setIsAnswersVisible(!isAnswersVisible),
    [isAnswersVisible]
  );

  const haveWarnings = useMemo(
    () => getQuestionWarnings(question).length > 0,
    [question]
  );

  const headerClasses = classNames(
    { [classes.WithWarnings]: haveWarnings },
    classes.Header
  );

  const toggleBtnClasses = classNames(
    { [classes.Closed]: !isAnswersVisible },
    { [classes.Opened]: isAnswersVisible },
    classes.ToggleBtn
  );

  return (
    <div className={classes.Question}>
      <div className={headerClasses}>
        <div className={toggleBtnClasses} onClick={toggleAnswersVisible} />

        {isAdmin ? (
          <div className={classes.HeaderContent}>
            <EditableInput
              className={classes.QuestionTitle}
              initialValue={question.title}
              onSubmit={handleTitleUpdate}
            >
              <Title small>
                {question.title}
                <span className={classes.QuestionType}>
                  {question.question_type}
                </span>
              </Title>
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

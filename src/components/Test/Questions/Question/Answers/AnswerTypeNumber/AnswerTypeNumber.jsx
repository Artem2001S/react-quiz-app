import React, { useCallback } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useTestCtx } from 'components/Test/TestContext';
import Title from 'components/UI/Title/Title';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import classes from './AnswerTypeNumber.module.scss';

const AnswerTypeNumber = ({
  questionId,
  questionType,
  questionTitle,
  answer,
}) => {
  const { isAdmin } = useAuth();
  const { onQuestionAnswerUpdate } = useTestCtx();

  const handleInputSubmit = useCallback(
    (newAnswerValue) => {
      onQuestionAnswerUpdate(
        questionId,
        questionTitle,
        questionType,
        newAnswerValue
      );
    },
    [onQuestionAnswerUpdate, questionId, questionTitle, questionType]
  );

  return (
    <div className={classes.AnswerTypeNumber}>
      {isAdmin ? (
        <EditableInput
          initialValue={answer}
          type="number"
          onSubmit={handleInputSubmit}
        >
          <Title small>{answer}</Title>
        </EditableInput>
      ) : (
        <Title small>Answer hided, because you're authorized as user.</Title>
      )}
    </div>
  );
};

export default React.memo(AnswerTypeNumber);

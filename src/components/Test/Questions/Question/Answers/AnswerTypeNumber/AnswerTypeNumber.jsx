import React, { useCallback } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useTestCtx } from 'components/Test/TestContext';
import Title from 'components/UI/Title/Title';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import classes from './AnswerTypeNumber.module.scss';

const AnswerTypeNumber = ({ question, answer }) => {
  const { isAdmin } = useAuth();
  const { onQuestionAnswerUpdate } = useTestCtx();

  const handleInputSubmit = useCallback(
    (newAnswerValue) => {
      onQuestionAnswerUpdate(
        question.id,
        question.title,
        question.question_type,
        newAnswerValue
      );
    },
    [onQuestionAnswerUpdate, question]
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

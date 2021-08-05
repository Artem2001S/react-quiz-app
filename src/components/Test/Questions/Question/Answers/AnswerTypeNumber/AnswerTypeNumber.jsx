import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTestCtx } from 'components/Test/TestContext';
import Title from 'components/UI/Title/Title';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import classes from './AnswerTypeNumber.module.scss';

const AnswerTypeNumber = ({ question, answer }) => {
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
      <EditableInput
        initialValue={answer}
        type="number"
        onSubmit={handleInputSubmit}
      >
        <Title small>{answer}</Title>
      </EditableInput>
    </div>
  );
};

AnswerTypeNumber.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.number,
};

export default React.memo(AnswerTypeNumber);

import React, { useMemo } from 'react';
import { getQuestionWarnings } from 'shared/helpers';
import { useAuth } from 'hooks/useAuth';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';
import Answer from './Answer/Answer';
import AnswerTypeNumber from './AnswerTypeNumber/AnswerTypeNumber';
import Warnings from './Warnings/Warnings';
import classes from './Answers.module.scss';

const Answers = ({ question }) => {
  const isQuestionTypeNumber = question.question_type === 'number';
  const { isAdmin } = useAuth();

  const warnings = useMemo(() => getQuestionWarnings(question), [question]);

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && isAdmin && (
        <NewAnswerForm questionId={question.id} />
      )}

      {warnings.length > 0 && <Warnings warnings={warnings} />}

      {isQuestionTypeNumber ? (
        <AnswerTypeNumber question={question} answer={question.answer} />
      ) : (
        question.answers.map((answer) => (
          <Answer key={answer.id} answer={answer} questionId={question.id} />
        ))
      )}
    </div>
  );
};

export default React.memo(Answers);

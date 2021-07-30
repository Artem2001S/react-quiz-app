import { useAuth } from 'hooks/useAuth';
import React from 'react';
import Answer from './Answer/Answer';
import classes from './Answers.module.scss';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';
import AnswerTypeNumber from './AnswerTypeNumber/AnswerTypeNumber';

const Answers = ({
  questionId,
  questionType,
  questionTitle,
  answers,
  answer,
}) => {
  const isQuestionTypeNumber = questionType === 'number';
  const { isAdmin } = useAuth();

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && isAdmin && (
        <NewAnswerForm questionId={questionId} />
      )}

      {isQuestionTypeNumber ? (
        <AnswerTypeNumber
          questionId={questionId}
          questionTitle={questionTitle}
          questionType={questionType}
          answer={answer}
        />
      ) : (
        answers.map((answer) => (
          <Answer key={answer.id} answer={answer} questionId={questionId} />
        ))
      )}
    </div>
  );
};

export default React.memo(Answers);

import { useAuth } from 'hooks/useAuth';
import React from 'react';
import Answer from './Answer/Answer';
import classes from './Answers.module.scss';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';

const Answers = ({ questionId, questionType, answers, answer }) => {
  const isQuestionTypeNumber = questionType === 'number';
  const { isAdmin } = useAuth();

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && isAdmin && (
        <NewAnswerForm questionId={questionId} />
      )}

      {isQuestionTypeNumber ? (
        <div>{answer}</div>
      ) : (
        answers.map((answer) => (
          <Answer key={answer.id} answer={answer} questionId={questionId} />
        ))
      )}
    </div>
  );
};

export default React.memo(Answers);
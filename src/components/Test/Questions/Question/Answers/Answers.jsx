import { useAuth } from 'hooks/useAuth';
import React from 'react';
import Answer from './Answer/Answer';
import classes from './Answers.module.scss';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';
import AnswerTypeNumber from './AnswerTypeNumber/AnswerTypeNumber';

const Answers = ({ question }) => {
  const isQuestionTypeNumber = question.question_type === 'number';
  const { isAdmin } = useAuth();

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && isAdmin && (
        <NewAnswerForm questionId={question.id} />
      )}

      {isQuestionTypeNumber ? (
        <AnswerTypeNumber
          questionId={question.id}
          questionTitle={question.title}
          questionType={question.question_type}
          answer={question.answer}
        />
      ) : (
        question.answers.map((answer) => (
          <Answer
            key={answer.id}
            answer={answer}
            questionId={question.questionId}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(Answers);

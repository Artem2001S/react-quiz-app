import React, { useCallback } from 'react';
import { useTestCtx } from 'components/Test/TestContext';
import { questionTypes } from 'shared/constants';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';
import Answer from './Answer/Answer';
import AnswerTypeNumber from './AnswerTypeNumber/AnswerTypeNumber';
import DragList from 'components/DragList/DragList';
import classes from './Answers.module.scss';

const Answers = ({ question }) => {
  const isQuestionTypeNumber = question.question_type === 'number';
  const { onAnswerPositionChanged } = useTestCtx();

  const isDeletingAvailable = question.answers.length > 2;
  const isSingleQuestion = question.question_type === questionTypes.single;

  const handleAnswerMove = useCallback(
    (from, to) => {
      const currentAnswer = question.answers[from];

      onAnswerPositionChanged(to, currentAnswer.id, question.id);
    },
    [onAnswerPositionChanged, question.answers, question.id]
  );

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && <NewAnswerForm questionId={question.id} />}

      {isQuestionTypeNumber ? (
        <AnswerTypeNumber question={question} answer={question.answer} />
      ) : (
        <DragList onItemDrop={handleAnswerMove}>
          {question.answers.map((answer, index) => (
            <Answer
              key={answer.id}
              answer={answer}
              isDeletingAvailable={isDeletingAvailable}
              questionId={question.id}
              isSingleQuestion={isSingleQuestion}
            />
          ))}
        </DragList>
      )}
    </div>
  );
};

export default React.memo(Answers);

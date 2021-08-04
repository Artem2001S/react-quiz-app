import React, { useState, useCallback } from 'react';
import { useAuth } from 'hooks/useAuth';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';
import Answer from './Answer/Answer';
import AnswerTypeNumber from './AnswerTypeNumber/AnswerTypeNumber';
import classes from './Answers.module.scss';
import { useTestCtx } from 'components/Test/TestContext';
import { questionTypes } from 'shared/constants';
import DragList from 'components/DragList/DragList';

const Answers = ({ question }) => {
  const isQuestionTypeNumber = question.question_type === 'number';
  const { isAdmin } = useAuth();
  const { onAnswerPositionChanged } = useTestCtx();

  // const [currentAnswerData, setCurrentAnswerData] = useState();

  const isDeletingAvailable = question.answers.length > 2;
  const isSingleQuestion = question.question_type === questionTypes.single;

  // const onDragStart = useCallback(
  //   (e, answer, index) => setCurrentAnswerData({ id: answer.id, index }),
  //   []
  // );

  // const onDragLeave = useCallback(
  //   (e) => e.currentTarget.classList.remove(classes.Grabbing),
  //   []
  // );

  // const onDragEnd = useCallback(
  //   (e) => e.currentTarget.classList.remove(classes.Grabbing),
  //   []
  // );

  // const onDragOver = useCallback((e) => {
  //   e.preventDefault();
  //   e.currentTarget.classList.add(classes.Grabbing);
  // }, []);

  // const onDrop = useCallback(
  //   (e, newIndex) => {
  //     e.preventDefault();

  //     e.currentTarget.classList.remove(classes.Grabbing);

  //     newIndex !== currentAnswerData.index &&
  //       onAnswerPositionChanged(newIndex, currentAnswerData.id, question.id);
  //   },
  //   [currentAnswerData, onAnswerPositionChanged, question]
  // );

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && isAdmin && (
        <NewAnswerForm questionId={question.id} />
      )}

      {isQuestionTypeNumber ? (
        <AnswerTypeNumber question={question} answer={question.answer} />
      ) : (
        <DragList>
          {question.answers.map((answer, index) => (
            <Answer
              key={answer.id}
              answer={answer}
              isDeletingAvailable={isDeletingAvailable}
              questionId={question.id}
              isSingleQuestion={isSingleQuestion}
              index={index}
            />
          ))}
        </DragList>
      )}
    </div>
  );
};

export default React.memo(Answers);

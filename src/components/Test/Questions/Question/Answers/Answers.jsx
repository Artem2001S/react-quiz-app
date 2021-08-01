import React, { useMemo, useState, useCallback } from 'react';
import { getQuestionWarnings } from 'shared/helpers';
import { useAuth } from 'hooks/useAuth';
import NewAnswerForm from './NewAnswerForm/NewAnswerForm';
import Answer from './Answer/Answer';
import AnswerTypeNumber from './AnswerTypeNumber/AnswerTypeNumber';
import Warnings from './Warnings/Warnings';
import classes from './Answers.module.scss';
import { useTestCtx } from 'components/Test/TestContext';

const Answers = ({ question }) => {
  const isQuestionTypeNumber = question.question_type === 'number';
  const { isAdmin } = useAuth();
  const { onAnswerPositionChanged } = useTestCtx();

  const warnings = useMemo(() => getQuestionWarnings(question), [question]);

  const [currentAnswerData, setCurrentAnswerData] = useState();

  const onDragStart = useCallback(
    (e, answer, index) => setCurrentAnswerData({ id: answer.id, index }),
    []
  );

  const onDragLeave = useCallback((e) => {
    e.currentTarget.classList.remove(classes.Grabbing);
  }, []);

  const onDragEnd = useCallback((e) => {
    e.currentTarget.classList.remove(classes.Grabbing);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.add(classes.Grabbing);
  }, []);

  const onDrop = useCallback(
    (e, newIndex) => {
      e.preventDefault();

      e.currentTarget.classList.remove(classes.Grabbing);

      newIndex !== currentAnswerData.index &&
        onAnswerPositionChanged(newIndex, currentAnswerData.id, question.id);
    },
    [currentAnswerData, onAnswerPositionChanged, question]
  );

  return (
    <div className={classes.Answers}>
      {!isQuestionTypeNumber && isAdmin && (
        <NewAnswerForm questionId={question.id} />
      )}

      {warnings.length > 0 && <Warnings warnings={warnings} />}

      {isQuestionTypeNumber ? (
        <AnswerTypeNumber question={question} answer={question.answer} />
      ) : (
        question.answers.map((answer, index) => (
          <Answer
            key={answer.id}
            answer={answer}
            index={index}
            questionId={question.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(Answers);

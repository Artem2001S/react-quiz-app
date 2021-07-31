import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { questionTypes } from 'shared/constants';
import { useQuizCtx } from 'components/Quiz/QuizContext';
import Button from 'components/UI/Button/Button';
import SelectItem from './SelectItem/SelectItem';
import classes from './Select.module.scss';

const Select = () => {
  const { currentQuestion, nextQuestion, isLastQuestion } = useQuizCtx();
  const questionType = currentQuestion.question_type;
  const isSingleSelect = questionType === questionTypes.single;
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const selectItemClickHandler = useCallback(
    (index) => {
      if (isSingleSelect) {
        setSelectedIndexes([index]);
      } else {
        const indexExists = selectedIndexes.includes(index);

        indexExists
          ? setSelectedIndexes(
              selectedIndexes.filter((selectedIndex) => selectedIndex !== index)
            )
          : setSelectedIndexes([...selectedIndexes, index]);
      }
    },
    [isSingleSelect, selectedIndexes]
  );

  const nextQuestionBtnClickHandler = useCallback(() => {
    nextQuestion(questionType, selectedIndexes);
    setSelectedIndexes([]);
  }, [nextQuestion, questionType, selectedIndexes]);

  return (
    <div className={classes.Select}>
      {currentQuestion.answers.map((answer, index) => (
        <SelectItem
          key={answer.id}
          className={classNames(classes.Selected, classes.SelectItem)}
          index={index}
          isSelected={selectedIndexes.includes(index)}
          onClick={selectItemClickHandler}
        >
          {answer.text}
        </SelectItem>
      ))}
      <Button className={classes.NextBtn} onClick={nextQuestionBtnClickHandler}>
        {isLastQuestion ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

export default React.memo(Select);

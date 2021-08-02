import React, { useState, useCallback, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { questionTypes } from 'shared/constants';
import Button from 'components/UI/Button/Button';
import Title from 'components/UI/Title/Title';
import Input from 'components/UI/Input/Input';
import DropDown from 'components/UI/DropDown/DropDown';
import classes from './NewQuestionForm.module.scss';

const NewQuestionForm = ({ testId, onSubmit }) => {
  const [selectedQuestionTypeIndex, setSelectedQuestionTypeIndex] = useState(0);

  const [titleInput, setTitleInput] = useState({
    id: nanoid(),
    label: 'Title:',
    value: '',
  });

  const questionTypeNumberIndex = 2;
  const [answerInput, setAnswerInput] = useState(null);

  useEffect(() => {
    selectedQuestionTypeIndex === questionTypeNumberIndex
      ? setAnswerInput({
          id: nanoid(),
          type: 'number',
          value: 0,
        })
      : setAnswerInput(null);
  }, [selectedQuestionTypeIndex]);

  const answerInputChangeHandler = useCallback(
    (e) => {
      setAnswerInput({ ...answerInput, value: e.target.value });
    },
    [answerInput]
  );

  const titleInputChangeHandler = useCallback(
    (e) => {
      setTitleInput({ ...titleInput, value: e.target.value });
    },
    [titleInput]
  );

  const [questionTypesArray] = useState([
    { title: questionTypes.single },
    { title: questionTypes.multiple },
    { title: questionTypes.number },
  ]);

  const selectedIndexChanged = useCallback((index) => {
    setSelectedQuestionTypeIndex(index);
  }, []);

  const resetInputs = useCallback(() => {
    setTitleInput({ ...titleInput, value: '' });
    answerInput && setAnswerInput({ ...answerInput, value: 0 });
  }, [answerInput, titleInput]);

  const submitFormHandler = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(testId, {
        title: titleInput.value,
        question_type: questionTypesArray[selectedQuestionTypeIndex].title,
        answer: answerInput ? Number(answerInput.value) : null,
      });
      resetInputs();
    },
    [
      answerInput,
      onSubmit,
      questionTypesArray,
      resetInputs,
      selectedQuestionTypeIndex,
      testId,
      titleInput,
    ]
  );

  return (
    <div className={classes.NewQuestionFormContainer}>
      <Title small>Create new question</Title>
      <form onSubmit={submitFormHandler}>
        <Input {...titleInput} onChange={titleInputChangeHandler} />
        {answerInput && (
          <Input {...answerInput} onChange={answerInputChangeHandler} />
        )}
        <DropDown
          label="Choose question type:"
          items={questionTypesArray}
          selectedItemIndex={selectedQuestionTypeIndex}
          onSelectedItemChanged={selectedIndexChanged}
        />
      </form>

      <Button onClick={submitFormHandler} className={classes.SubmitBtn}>
        Submit
      </Button>
    </div>
  );
};

export default React.memo(NewQuestionForm);

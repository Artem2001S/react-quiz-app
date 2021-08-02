import React, { useState, useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import RadioGroup from 'components/UI/RadioGroup/RadioGroup';
import Button from 'components/UI/Button/Button';
import classes from './NewQuestionForm.module.scss';
import Title from 'components/UI/Title/Title';
import Input from 'components/UI/Input/Input';
import { useEffect } from 'react';

const NewQuestionForm = ({ testId, onSubmit }) => {
  const [selectedRadioIndex, setSelectedRadioIndex] = useState(0);

  const [titleInput, setTitleInput] = useState({
    id: nanoid(),
    label: 'Title:',
    value: '',
  });

  const questionTypeNumberIndex = 2;
  const [answerInput, setAnswerInput] = useState(null);

  useEffect(() => {
    selectedRadioIndex === questionTypeNumberIndex
      ? setAnswerInput({
          id: nanoid(),
          label: 'Answer:',
          type: 'number',
          value: 0,
        })
      : setAnswerInput(null);
  }, [selectedRadioIndex]);

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

  const [questionTypeRadioButtons] = useState([
    { id: nanoid(), label: 'Single', value: 'single' },
    { id: nanoid(), label: 'Multiple', value: 'multiple' },
    { id: nanoid(), label: 'Number', value: 'number' },
  ]);

  const selectedIndexChanged = useCallback((index) => {
    setSelectedRadioIndex(index);
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
        question_type: questionTypeRadioButtons[selectedRadioIndex].value,
        answer: answerInput ? Number(answerInput.value) : null,
      });
      resetInputs();
    },
    [
      onSubmit,
      testId,
      titleInput,
      questionTypeRadioButtons,
      selectedRadioIndex,
      answerInput,
      resetInputs,
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

        <RadioGroup
          label="Choose question type:"
          radioButtons={questionTypeRadioButtons}
          selectedIndex={selectedRadioIndex}
          selectedIndexChanged={selectedIndexChanged}
        />
      </form>

      <Button onClick={submitFormHandler} className={classes.SubmitBtn}>
        Submit
      </Button>
    </div>
  );
};

export default React.memo(NewQuestionForm);

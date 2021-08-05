import React, { useState, useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { getQuestionWarnings } from 'shared/helpers';
import { questionTypes } from 'shared/constants';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import AnswerInput from './AnswerInput/AnswerInput';
import Title from 'components/UI/Title/Title';
import Errors from 'components/UI/Errors/Errors';
import DragList from 'components/DragList/DragList';
import classes from './NewQuestionForm.module.scss';

const NewQuestionForm = ({ testId, questionType, onSubmit }) => {
  const isNumberQuestion = questionType === questionTypes.number;
  const isSingleQuestion = questionType === questionTypes.single;
  const isMultipleQuestion = questionType === questionTypes.multiple;

  const [titleInput, setTitleInput] = useState({
    id: nanoid(),
    label: 'Title:',
    value: '',
  });

  const [answerInputs, setAnswerInputs] = useState([
    { id: nanoid(), text: 'Answer 1', isRight: true },
    { id: nanoid(), text: 'Answer 2', isRight: false },
  ]);

  const [validationErrors, setValidationErrors] = useState([]);

  const moveAnswerInput = useCallback(
    (from, to) => {
      const answers = [...answerInputs];
      const [item] = answers.splice(from, 1);
      answers.splice(to, 0, item);
      setAnswerInputs(answers);
    },
    [answerInputs]
  );

  const changeAnswerInputText = useCallback(
    (id, newText) => {
      setAnswerInputs(
        answerInputs.map((answerInput) =>
          answerInput.id === id
            ? { ...answerInput, text: newText }
            : answerInput
        )
      );
    },
    [answerInputs]
  );

  const changeAnswerInputIsRight = useCallback(
    (id, newIsRight) => {
      if (isSingleQuestion) {
        setAnswerInputs(
          answerInputs.map((answerInput) =>
            answerInput.isRight
              ? { ...answerInput, isRight: false }
              : answerInput.id === id
              ? { ...answerInput, isRight: newIsRight }
              : answerInput
          )
        );
      } else {
        setAnswerInputs(
          answerInputs.map((answerInput) =>
            answerInput.id === id
              ? { ...answerInput, isRight: newIsRight }
              : answerInput
          )
        );
      }
    },
    [answerInputs, isSingleQuestion]
  );

  const deleteAnswerInputsItem = useCallback(
    (id) =>
      setAnswerInputs(
        answerInputs.filter((answerInput) => answerInput.id !== id)
      ),
    [answerInputs]
  );
  const newAnswerBtnClickHandler = useCallback(() => {
    setAnswerInputs([
      { id: nanoid(), text: 'New answer', isRight: false },
      ...answerInputs,
    ]);
  }, [answerInputs]);

  const [answerInput, setAnswerInput] = useState(
    isNumberQuestion && {
      id: nanoid(),
      type: 'number',
      value: 0,
    }
  );

  const answerInputChangeHandler = useCallback(
    (e) => setAnswerInput({ ...answerInput, value: e.currentTarget.value }),
    [answerInput]
  );

  const titleInputChangeHandler = useCallback(
    (e) => {
      setTitleInput({ ...titleInput, value: e.currentTarget.value });
    },
    [titleInput]
  );

  const submitFormHandler = useCallback(
    (e) => {
      e.preventDefault();

      const question = {
        title: titleInput.value,
        question_type: questionType,
        answer: answerInput ? Number(answerInput.value) : null,
        answers: !isNumberQuestion
          ? answerInputs.map((answerInput) => ({
              text: answerInput.text,
              is_right: answerInput.isRight,
            }))
          : [],
      };

      const validationErrors = getQuestionWarnings(question);
      setValidationErrors(validationErrors);

      !validationErrors.length && onSubmit(testId, question);
    },
    [
      answerInput,
      answerInputs,
      isNumberQuestion,
      onSubmit,
      questionType,
      testId,
      titleInput,
    ]
  );

  return (
    <div className={classes.NewQuestionFormContainer}>
      <form onSubmit={submitFormHandler}>
        {validationErrors.length > 0 && <Errors errors={validationErrors} />}
        <Input {...titleInput} onChange={titleInputChangeHandler} />
        {isNumberQuestion && (
          <Input {...answerInput} onChange={answerInputChangeHandler} />
        )}
        {!isNumberQuestion && (
          <>
            <div className={classes.AnswersTop}>
              <Title small>Answers</Title>
              <Button type="button" small onClick={newAnswerBtnClickHandler}>
                New
              </Button>
            </div>
            <DragList onItemDrop={moveAnswerInput}>
              {answerInputs.map((answerInput) => (
                <AnswerInput
                  key={answerInput.id}
                  id={answerInput.id}
                  text={answerInput.text}
                  isRight={answerInput.isRight}
                  isMultiple={isMultipleQuestion}
                  onTextChanged={changeAnswerInputText}
                  onIsRightChanged={changeAnswerInputIsRight}
                  onDelete={deleteAnswerInputsItem}
                />
              ))}
            </DragList>
          </>
        )}
      </form>

      <Button onClick={submitFormHandler} className={classes.SubmitBtn}>
        Submit
      </Button>
    </div>
  );
};

export default React.memo(NewQuestionForm);

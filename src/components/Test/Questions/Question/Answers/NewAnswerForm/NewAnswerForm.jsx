import React, { useState, useCallback } from 'react';
import { useTestCtx } from 'components/Test/TestContext';
import { nanoid } from 'nanoid';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import classes from './NewAnswerForm.module.scss';

const NewAnswerForm = ({ questionId }) => {
  const { onNewAnswerFormSubmit } = useTestCtx();

  const [input, setInput] = useState({
    id: nanoid(),
    value: '',
    label: 'New answer title:',
  });

  const inputChangeHandler = useCallback(
    (e) => setInput({ ...input, value: e.currentTarget.value }),
    [input]
  );

  const submitFormHandler = useCallback(
    (e) => {
      e.preventDefault();

      const answerText = input.value.trim();
      answerText && onNewAnswerFormSubmit(questionId, answerText);
      setInput({ ...input, value: '' });
    },
    [input, questionId, onNewAnswerFormSubmit]
  );

  return (
    <form onSubmit={submitFormHandler} className={classes.NewAnswerForm}>
      <Input {...input} onChange={inputChangeHandler} />
      <Button
        small
        green
        className={classes.SubmitBtn}
        onClick={submitFormHandler}
      >
        +
      </Button>
    </form>
  );
};

export default React.memo(NewAnswerForm);

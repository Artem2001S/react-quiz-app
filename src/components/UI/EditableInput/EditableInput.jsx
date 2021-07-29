import classNames from 'classnames';
import React, { useState } from 'react';
import { useCallback } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './EditableInput.module.scss';

const EditableInput = ({
  className,
  label,
  initialValue,
  type = 'text',
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isEditMode, setIsEditMode] = useState(false);

  const inputChangeHandler = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const submit = useCallback(() => {
    if (!inputValue) {
      setInputValue(initialValue);
    }
    if (inputValue && inputValue !== initialValue) {
      onSubmit(inputValue);
    }
  }, [initialValue, inputValue, onSubmit]);

  const editBtnClickHandler = useCallback(() => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      submit();
    }
  }, [isEditMode, submit]);

  const inputKeyPressHandler = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setIsEditMode(false);
        submit();
      }
    },
    [submit]
  );

  const inputClasses = classNames(classes.Input, className);
  return (
    <div className={classes.EditableInputContainer}>
      <Input
        className={inputClasses}
        label={label}
        type={type}
        value={inputValue}
        onChange={inputChangeHandler}
        readOnly={!isEditMode}
        onKeyPress={inputKeyPressHandler}
      />
      <Button small onClick={editBtnClickHandler}>
        {isEditMode ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
};

export default React.memo(EditableInput);
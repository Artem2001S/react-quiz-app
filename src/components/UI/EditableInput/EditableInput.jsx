import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './EditableInput.module.scss';

const EditableInput = ({
  className,
  label,
  initialValue,
  type = 'text',
  children,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isEditMode, setIsEditMode] = useState(false);

  const inputChangeHandler = useCallback(
    (e) => setInputValue(e.target.value),
    []
  );

  const submit = useCallback(() => {
    const trimmedValue = type === 'text' ? inputValue.trim() : +inputValue;

    trimmedValue !== '' &&
      trimmedValue !== initialValue &&
      onSubmit(trimmedValue);

    setInputValue(trimmedValue || initialValue);
  }, [initialValue, inputValue, onSubmit, type]);

  const editBtnClickHandler = useCallback(() => {
    setIsEditMode(!isEditMode);
    isEditMode && submit();
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
  const containerClasses = classNames(
    { [classes.EditMode]: isEditMode },
    classes.EditableInputContainer
  );

  return (
    <div className={containerClasses}>
      {isEditMode ? (
        <Input
          className={inputClasses}
          label={label}
          type={type}
          value={inputValue}
          autoFocus={true}
          onChange={inputChangeHandler}
          readOnly={!isEditMode}
          onKeyPress={inputKeyPressHandler}
          onBlur={editBtnClickHandler}
        />
      ) : (
        children
      )}

      <Button small onClick={editBtnClickHandler}>
        {isEditMode ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
};

export default React.memo(EditableInput);

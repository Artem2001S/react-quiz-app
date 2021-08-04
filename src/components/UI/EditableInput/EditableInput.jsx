import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const hideModal = useCallback(() => setIsModalVisible(false), []);
  const showModal = useCallback(() => setIsModalVisible(true), []);

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

  const editBtnClickHandler = useCallback(
    () =>
      isEditMode
        ? initialValue === inputValue
          ? setIsEditMode(false)
          : showModal()
        : setIsEditMode(true),
    [initialValue, inputValue, isEditMode, showModal]
  );

  const inputKeyPressHandler = useCallback(
    (e) => e.key === 'Enter' && showModal(),
    [showModal]
  );

  const saveBtnClickHandler = useCallback(() => {
    hideModal();
    setIsEditMode(false);
    submit();
  }, [hideModal, submit]);

  const cancelBtnClickHandler = useCallback(() => {
    setIsEditMode(false);
    setInputValue(initialValue);
    hideModal();
  }, [hideModal, initialValue]);

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
          readOnly={!isEditMode}
          onChange={inputChangeHandler}
          onBlur={editBtnClickHandler}
          onKeyPress={inputKeyPressHandler}
        />
      ) : (
        children
      )}

      <Button small onClick={editBtnClickHandler}>
        {isEditMode ? 'Save' : 'Edit'}
      </Button>
      <Modal
        isVisible={isModalVisible}
        hideModal={hideModal}
        title="Save new value ?"
      >
        <div className={classes.ModalContent}>
          <Button onClick={saveBtnClickHandler}>Save</Button>
          <Button onClick={cancelBtnClickHandler}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(EditableInput);

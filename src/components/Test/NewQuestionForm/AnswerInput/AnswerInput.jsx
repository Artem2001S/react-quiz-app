import React, { useCallback } from 'react';
import Input from 'components/UI/Input/Input';
import classes from './AnswerInput.module.scss';
import RadioButton from 'components/UI/RadioButton/RadioButton';
import Checkbox from 'components/UI/Checkbox/Checkbox';
import Button from 'components/UI/Button/Button';

const AnswerInput = ({
  id,
  text,
  isRight,
  onIsRightChanged,
  isMultiple,
  onTextChanged,
  onDelete,
}) => {
  const handleTextChanged = useCallback(
    (e) => onTextChanged(id, e.target.value),
    [id, onTextChanged]
  );

  const onChangeHandler = useCallback(
    () => onIsRightChanged(id, !isRight),
    [id, isRight, onIsRightChanged]
  );

  const deleteBtnClickHandler = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <div className={classes.AnswerInput}>
      {isMultiple ? (
        <Checkbox checked={isRight} onChange={onChangeHandler} />
      ) : (
        <RadioButton checked={isRight} onChange={onChangeHandler} />
      )}

      <Input value={text} onChange={handleTextChanged} />
      <Button small danger onClick={deleteBtnClickHandler}>
        &times;
      </Button>
    </div>
  );
};

export default React.memo(AnswerInput);

import React, { useCallback } from 'react';
import classes from './RadioButton.module.scss';

const RadioButton = ({ id, label, value, index, isSelected, onSelect }) => {
  const handleCheckedChanged = useCallback(
    () => onSelect(index),
    [index, onSelect]
  );

  return (
    <div className={classes.RadioContainer}>
      <label htmlFor={id} className={classes.RadioContent}>
        <input
          id={id}
          className={classes.RadioButton}
          type="radio"
          checked={isSelected}
          onChange={handleCheckedChanged}
        />
        <div className={classes.RadioIcon} />
        <span className={classes.Label}>{label}</span>
      </label>
    </div>
  );
};

export default React.memo(RadioButton);

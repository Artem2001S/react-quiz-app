import React from 'react';
import classes from './RadioButton.module.scss';

const RadioButton = ({ id, label, index, isChecked, onChange }) => (
  <div className={classes.RadioContainer}>
    <label htmlFor={id} className={classes.RadioContent}>
      <input
        id={id}
        className={classes.RadioButton}
        type="radio"
        checked={isChecked}
        onChange={onChange}
      />
      <div className={classes.RadioIcon} />
      <span className={classes.Label}>{label}</span>
    </label>
  </div>
);

export default React.memo(RadioButton);

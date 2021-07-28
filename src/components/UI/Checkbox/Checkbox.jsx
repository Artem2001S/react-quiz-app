import React from 'react';
import classes from './Checkbox.module.scss';

const Checkbox = ({ id, label, ...props }) => {
  return (
    <label htmlFor={id} className={classes.CheckboxContainer}>
      <input
        className={classes.CheckboxInput}
        id={id}
        type="checkbox"
        {...props}
      />
      <span className={classes.Checkbox} />
      <span className={classes.Label}>{label}</span>
    </label>
  );
};

export default Checkbox;

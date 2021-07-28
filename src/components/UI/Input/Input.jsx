import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

const Input = ({ id, label, ...props }) => (
  <div className={classes.InputContainer}>
    <label htmlFor={id}>
      <span className={classes.InputLabelText}>{label}</span>
      <input className={classes.Input} id={id} type="text" {...props} />
    </label>
  </div>
);

Input.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default React.memo(Input);

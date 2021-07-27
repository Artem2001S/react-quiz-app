import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

const Input = ({ id, label, value, onChange }) => {
  return (
    <div className={classes.InputContainer}>
      <label htmlFor={id}>
        <span className={classes.InputLabelText}>{label}</span>
        <input
          className={classes.Input}
          id={id}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;

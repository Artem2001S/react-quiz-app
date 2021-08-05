import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';
import classNames from 'classnames';

const Input = ({ id, label, className, ...props }) => (
  <div className={classes.InputContainer}>
    <label htmlFor={id}>
      {label && <span className={classes.InputLabelText}>{label}</span>}

      <input
        className={classNames(classes.Input, className)}
        id={id}
        type="text"
        {...props}
      />
    </label>
  </div>
);

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(Input);

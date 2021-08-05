import React from 'react';
import PropTypes from 'prop-types';
import classes from './Checkbox.module.scss';

const Checkbox = ({ id, label, ...props }) => (
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

Checkbox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
};

export default React.memo(Checkbox);

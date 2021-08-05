import React from 'react';
import PropTypes from 'prop-types';
import classes from './RadioButton.module.scss';

const RadioButton = ({ id, label, checked, onChange }) => (
  <div className={classes.RadioContainer}>
    <label htmlFor={id} className={classes.RadioContent}>
      <input
        id={id}
        className={classes.RadioButton}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <div className={classes.RadioIcon} />
      {label && <span className={classes.Label}>{label}</span>}
    </label>
  </div>
);

RadioButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default React.memo(RadioButton);

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

const Input = ({ id, label, onChange, ...props }) => {
  const handleChange = useCallback(
    (e) => onChange(id, e.target.value),
    [id, onChange]
  );

  return (
    <div className={classes.InputContainer}>
      <label htmlFor={id}>
        <span className={classes.InputLabelText}>{label}</span>
        <input
          className={classes.Input}
          id={id}
          type="text"
          onChange={handleChange}
          {...props}
        />
      </label>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default React.memo(Input);

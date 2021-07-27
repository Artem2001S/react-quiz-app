import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = ({ children, ...props }) => {
  return (
    <button className={classes.Button} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = { children: PropTypes.node };

export default Button;

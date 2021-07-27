import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Button.module.scss';

const Button = ({ to, className, children, ...props }) => {
  return (
    <button className={classNames(classes.Button, className)} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = { children: PropTypes.node, className: PropTypes.string };

export default Button;

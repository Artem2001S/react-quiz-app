import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Button.module.scss';

const Button = ({
  to,
  className,
  children,
  danger,
  green,
  small,
  ...props
}) => {
  const cls = classNames(
    { [classes.Danger]: danger },
    { [classes.Green]: green },

    { [classes.Small]: small },
    classes.Button,
    className
  );
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = { children: PropTypes.node, className: PropTypes.string };

export default React.memo(Button);

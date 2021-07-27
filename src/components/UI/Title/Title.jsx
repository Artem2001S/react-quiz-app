import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Title.module.scss';

const Title = ({ small, medium, large, children, className }) => {
  const titleClasses = classNames(
    {
      [classes.Large]: large,
      [classes.Small]: small,
      [classes.Medium]: medium,
    },
    classes.Title,
    className
  );
  return <div className={titleClasses}>{children}</div>;
};

Title.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node,
};

export default Title;

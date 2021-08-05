import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Title.module.scss';

const Title = ({ small, medium, large, children, centered, className }) => {
  const titleClasses = classNames(
    {
      [classes.Large]: large,
      [classes.Small]: small,
      [classes.Medium]: medium,
      [classes.Centered]: centered,
    },
    classes.Title,
    className
  );

  return <div className={titleClasses}>{children}</div>;
};

Title.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  centered: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(Title);

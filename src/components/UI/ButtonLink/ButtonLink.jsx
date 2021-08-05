import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import classes from './ButtonLink.module.scss';

const ButtonLink = ({ className, to, children, ...props }) => (
  <Link
    className={classNames(classes.ButtonLink, className)}
    to={to}
    {...props}
  >
    {children}
  </Link>
);

ButtonLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(ButtonLink);

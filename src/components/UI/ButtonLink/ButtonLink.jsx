import React from 'react';
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
export default ButtonLink;

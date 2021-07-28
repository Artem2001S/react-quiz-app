import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';

const Logo = () => (
  <Link to="/" className={classes.Logo}>
    Quiz
  </Link>
);

export default React.memo(Logo);

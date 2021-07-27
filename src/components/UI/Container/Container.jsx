import React from 'react';
import classes from './Container.module.scss';

const Container = ({ children }) => (
  <div className={classes.Container}>{children}</div>
);

export default Container;

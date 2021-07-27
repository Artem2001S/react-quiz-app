import React from 'react';
import classNames from 'classnames';
import classes from './Container.module.scss';

const Container = ({ centered, children }) => (
  <div
    className={classNames({ [classes.Centered]: centered }, classes.Container)}
  >
    {children}
  </div>
);

export default React.memo(Container);

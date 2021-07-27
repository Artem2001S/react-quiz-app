import classNames from 'classnames';
import React from 'react';
import classes from './Container.module.scss';

const Container = ({ fullScreen, centered, children }) => (
  <div
    className={classNames(
      { [classes.Centered]: centered, [classes.FullScreen]: fullScreen },
      classes.Container
    )}
  >
    {children}
  </div>
);

export default Container;

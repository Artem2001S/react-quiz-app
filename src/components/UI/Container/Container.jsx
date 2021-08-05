import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Container.module.scss';

const Container = ({ centered, children }) => (
  <div
    className={classNames({ [classes.Centered]: centered }, classes.Container)}
  >
    {children}
  </div>
);

Container.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(Container);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Alert.module.scss';

const Alert = ({ message, close }) => {
  useEffect(() => {
    if (message) {
      const id = setTimeout(() => close(), 5000);
      return () => clearTimeout(id);
    }
  }, [close, message]);

  return <div className={classes.Alert}>{message}</div>;
};

Alert.propTypes = {
  message: PropTypes.string,
  close: PropTypes.func,
};

export default React.memo(Alert);

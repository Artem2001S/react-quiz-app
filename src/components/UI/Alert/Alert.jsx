import React, { useEffect } from 'react';
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

export default React.memo(Alert);

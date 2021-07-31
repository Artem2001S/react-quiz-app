import React from 'react';
import classes from './Warnings.module.scss';

const Warnings = ({ warnings }) => {
  return (
    <div
      className={classes.Warnings}
      title="Fix warning. Question with warning may not displayed in quiz "
    >
      {warnings.map((warning) => (
        <div key={warning}>{warning}</div>
      ))}
    </div>
  );
};

export default React.memo(Warnings);

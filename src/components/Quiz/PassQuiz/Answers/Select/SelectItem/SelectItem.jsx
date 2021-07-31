import React, { useCallback } from 'react';
import classNames from 'classnames';
import classes from './SelectItem.module.scss';

const SelectItem = ({ isSelected, index, children, onClick }) => {
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  return (
    <div
      className={classNames(
        { [classes.Selected]: isSelected },
        classes.SelectItem
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default React.memo(SelectItem);

import classNames from 'classnames';
import React, { useCallback } from 'react';
import classes from './DropDownItem.module.scss';

const DropDownItem = ({ title, isCurrent, index, onClick }) => {
  const itemClasses = classNames(
    { [classes.Active]: isCurrent },
    classes.DropDownItem
  );

  const handleItemClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <div className={itemClasses} onClick={handleItemClick}>
      {title}
    </div>
  );
};

export default React.memo(DropDownItem);

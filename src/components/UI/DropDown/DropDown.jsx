import React, { useState, useCallback, useEffect } from 'react';
import DropDownItem from './DropDownItem/DropDownItem';
import classes from './DropDown.module.scss';

const DropDown = ({
  label,
  items,
  selectedItemIndex = 0,
  onSelectedItemChanged,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleDropDownBtnClick = useCallback(() => {
    setIsContentVisible(!isContentVisible);
  }, [isContentVisible]);

  const toggleIsContentVisible = useCallback(
    () => setIsContentVisible(!isContentVisible),
    [isContentVisible]
  );

  useEffect(() => {
    if (isContentVisible) {
      document.addEventListener('click', toggleIsContentVisible);
    }

    return () => document.removeEventListener('click', toggleIsContentVisible);
  }, [isContentVisible, toggleIsContentVisible]);

  const handleItemClick = useCallback(
    (index) => {
      onSelectedItemChanged(index);
      setIsContentVisible(false);
    },
    [onSelectedItemChanged]
  );

  return (
    <div className={classes.DropDown}>
      <div className={classes.Label}>{label}</div>
      <div className={classes.Header} onClick={handleDropDownBtnClick}>
        <div className={classes.DropDownBtn}>
          {items[selectedItemIndex].title}
        </div>
        <div className={classes.DropIcon}>></div>
      </div>
      {isContentVisible && (
        <div className={classes.Content}>
          {items.map((item, index) => (
            <DropDownItem
              key={item.title}
              title={item.title}
              index={index}
              isCurrent={index === selectedItemIndex}
              onClick={handleItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(DropDown);

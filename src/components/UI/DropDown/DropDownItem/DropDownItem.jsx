import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

DropDownItem.propTypes = {
  title: PropTypes.string,
  isCurrent: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
};

export default React.memo(DropDownItem);

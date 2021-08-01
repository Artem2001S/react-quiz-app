import React, { useCallback } from 'react';
import classNames from 'classnames';
import Button from 'components/UI/Button/Button';
import classes from './PaginationButton.module.scss';

const PaginationButton = ({ pageNum, isCurrent, onClick }) => {
  const btnClickHandler = useCallback(() => {
    onClick(pageNum);
  }, [onClick, pageNum]);

  const btnClasses = classNames(
    { [classes.ActivePage]: isCurrent },
    classes.PaginationButton
  );

  return (
    <Button
      className={btnClasses}
      disabled={isCurrent}
      small
      onClick={btnClickHandler}
    >
      {pageNum}
    </Button>
  );
};

export default React.memo(PaginationButton);

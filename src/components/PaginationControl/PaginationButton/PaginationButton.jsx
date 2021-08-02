import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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

PaginationButton.propTypes = {
  pageNum: PropTypes.number,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func,
};

export default React.memo(PaginationButton);

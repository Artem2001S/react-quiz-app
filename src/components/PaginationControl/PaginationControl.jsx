import React from 'react';
import PaginationButton from './PaginationButton/PaginationButton';
import classes from './PaginationControl.module.scss';

const PaginationControl = ({
  currentPage,
  pagesCount,
  onPaginationChanged,
}) => (
  <div className={classes.PaginationButtons}>
    {new Array(pagesCount).fill().map((_, index) => (
      <PaginationButton
        key={index}
        pageNum={index + 1}
        isCurrent={currentPage === index + 1}
        onClick={onPaginationChanged}
      />
    ))}
  </div>
);

export default React.memo(PaginationControl);

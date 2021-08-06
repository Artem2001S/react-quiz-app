import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTestsCountSelector,
  getTestsCurrentPageSelector,
  getTestsIsFetchedSelector,
  getTestsListSelector,
  getTestsSearchValue,
  getTestsSortTypeSelector,
  getTotalPagesSelector,
} from 'redux/tests/selectors';
import { createNewTest, fetchTests } from 'redux/tests/testsSlice';
import { useAuth } from 'hooks/useAuth';
import { testsListSortTypes } from 'shared/constants';
import TestsList from 'components/TestsList/TestsList';
import PaginationControl from 'components/PaginationControl/PaginationControl';

const TestsListContainer = () => {
  const dispatch = useDispatch();

  const isFetched = useSelector(getTestsIsFetchedSelector);
  const tests = useSelector(getTestsListSelector);
  const testsCount = useSelector(getTestsCountSelector);
  const pagesCount = useSelector(getTotalPagesSelector);
  const currentPage = useSelector(getTestsCurrentPageSelector);
  const sortType = useSelector(getTestsSortTypeSelector);
  const searchValue = useSelector(getTestsSearchValue);

  useEffect(
    () =>
      dispatch(fetchTests({ sort: sortType, page: currentPage, searchValue })),
    [currentPage, dispatch, searchValue, sortType]
  );

  const { isAdmin } = useAuth();

  const newTestFormSubmitHandler = useCallback(
    (title) =>
      title &&
      dispatch(
        createNewTest({
          title,
        })
      ),
    [dispatch]
  );

  const handlePaginationChanged = useCallback(
    (pageNum) =>
      dispatch(fetchTests({ page: pageNum, sort: sortType, searchValue })),
    [dispatch, searchValue, sortType]
  );

  const handleToggleSortBtnClick = useCallback(
    () =>
      dispatch(
        fetchTests({
          page: currentPage,
          searchValue,
          sort:
            sortType === testsListSortTypes.createdAtAsc
              ? testsListSortTypes.createdAtDesc
              : testsListSortTypes.createdAtAsc,
        })
      ),
    [currentPage, dispatch, searchValue, sortType]
  );

  const onSearchFormSubmit = useCallback(
    (newSearchValue) =>
      dispatch(
        fetchTests({
          page: currentPage,
          sort: sortType,
          searchValue: newSearchValue,
        })
      ),
    [currentPage, dispatch, sortType]
  );

  return isFetched ? (
    <>
      <TestsList
        tests={tests}
        testsCount={testsCount}
        isAdmin={isAdmin}
        onSortChange={handleToggleSortBtnClick}
        onSearchFormSubmit={onSearchFormSubmit}
        onNewTestFormSubmit={newTestFormSubmitHandler}
      />
      {tests.length && (
        <PaginationControl
          currentPage={currentPage}
          pagesCount={pagesCount}
          onPaginationChanged={handlePaginationChanged}
        />
      )}
    </>
  ) : null;
};

export default React.memo(TestsListContainer);

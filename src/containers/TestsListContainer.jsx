import React, { useCallback } from 'react';
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
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import { createNewTest, deleteTest, fetchTests } from 'redux/tests/testsSlice';
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

  useComponentDidMount(() =>
    dispatch(fetchTests({ sort: sortType, page: currentPage, searchValue }))
  );

  const { isAdmin } = useAuth();

  const newTestFormSubmitHandler = useCallback(
    (title) => {
      if (title) {
        dispatch(
          createNewTest({
            title,
            currentPage,
            sort: sortType,
            searchValue,
          })
        );
      }
    },
    [currentPage, dispatch, searchValue, sortType]
  );

  const handleDeleteTestBtnClick = useCallback(
    (id) => {
      dispatch(deleteTest({ id, currentPage, sort: sortType, searchValue }));
    },
    [dispatch, currentPage, sortType, searchValue]
  );

  const handlePaginationChanged = useCallback(
    (pageNum) => {
      dispatch(fetchTests({ page: pageNum, sort: sortType, searchValue }));
    },
    [dispatch, searchValue, sortType]
  );

  const handleToggleSortBtnClick = useCallback(() => {
    dispatch(
      fetchTests({
        page: currentPage,
        searchValue,
        sort:
          sortType === testsListSortTypes.createdAtAsc
            ? testsListSortTypes.createdAtDesc
            : testsListSortTypes.createdAtAsc,
      })
    );
  }, [currentPage, dispatch, searchValue, sortType]);

  const onSearchFormSubmit = useCallback(
    (newSearchValue) => {
      dispatch(
        fetchTests({
          page: currentPage,
          sort: sortType,
          searchValue: newSearchValue,
        })
      );
    },
    [currentPage, dispatch, sortType]
  );

  return isFetched ? (
    <>
      <TestsList
        tests={tests}
        testsCount={testsCount}
        isAdmin={isAdmin}
        onDelete={handleDeleteTestBtnClick}
        onSortChange={handleToggleSortBtnClick}
        onSearchFormSubmit={onSearchFormSubmit}
        onNewTestFormSubmit={newTestFormSubmitHandler}
      />
      {tests.length > 0 && (
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

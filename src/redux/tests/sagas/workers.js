import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import {
  deleteTestRequest,
  fetchTestsRequest,
  postTestRequest,
} from '../requests';
import { testsLoaded } from '../testsSlice';

export function* fetchTestsWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const page = payload?.page;
    const sort = payload?.sort;
    const searchValue = payload?.searchValue;

    const { data } = yield call(fetchTestsRequest, page, sort, searchValue);
    const testsWithoutQuestions = data.tests.map(
      ({ questions, ...test }) => test
    );

    yield put(
      testsLoaded({
        tests: testsWithoutQuestions,
        meta: { ...data.meta, currentPage: page, sort, searchValue },
      })
    );
  } catch (error) {
    yield put(messageReceived({ message: 'Fetching tests error.' }));
    yield put(testsLoaded({ tests: [] }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* createNewTestWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { currentPage, sort, title, searchValue } = payload;

    yield call(postTestRequest, title);

    const { data } = yield call(
      fetchTestsRequest,
      currentPage,
      sort,
      searchValue
    );

    const testsWithoutQuestions = data.tests.map(
      ({ questions, ...test }) => test
    );

    yield put(
      testsLoaded({
        tests: testsWithoutQuestions,
        meta: { ...data.meta, currentPage, sort, searchValue },
      })
    );
  } catch (error) {
    yield put(messageReceived({ message: 'Create test server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* deleteTestWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { id, currentPage, sort, searchValue } = payload;

    yield call(deleteTestRequest, id);

    const { data } = yield call(
      fetchTestsRequest,
      currentPage,
      sort,
      searchValue
    );

    const testsWithoutQuestions = data.tests.map(
      ({ questions, ...test }) => test
    );

    yield put(
      testsLoaded({
        tests: testsWithoutQuestions,
        meta: { ...data.meta, currentPage, sort, searchValue },
      })
    );
  } catch (error) {
    yield put(messageReceived({ message: 'Create test server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

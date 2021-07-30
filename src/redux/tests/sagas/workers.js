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
import { testCreated, testRemoved, testsLoaded } from '../testsSlice';

export function* fetchTestsWorker() {
  try {
    yield put(loadingStarted());
    const { data } = yield call(fetchTestsRequest);
    const testsWithoutQuestions = data.tests.map(
      ({ questions, ...test }) => test
    );

    yield put(testsLoaded({ tests: testsWithoutQuestions }));
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
    const { data } = yield call(postTestRequest, payload.title);
    yield put(testCreated({ test: data }));
  } catch (error) {
    yield put(messageReceived({ message: 'Create test server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* deleteTestWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { id } = payload;

    yield call(deleteTestRequest, id);
    yield put(testRemoved({ id }));
  } catch (error) {
    yield put(messageReceived({ message: 'Create test server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

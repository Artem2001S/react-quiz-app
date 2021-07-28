import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import { fetchTestsRequest, postTestRequest } from '../requests';
import { testCreated, testsLoaded } from '../testsSlice';

export function* fetchTestsWorker() {
  try {
    yield put(loadingStarted());
    const { data } = yield call(fetchTestsRequest);
    const testsWithoutQuestions = data.tests.map(
      ({ questions, ...test }) => test
    );

    yield put(testsLoaded({ tests: testsWithoutQuestions }));
  } catch (error) {
    yield put(messageReceived('Fetching tests error.'));
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
    yield put(messageReceived('Create test server error.'));
  } finally {
    yield put(loadingFinished());
  }
}

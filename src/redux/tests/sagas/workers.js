import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
} from 'redux/userInterface/userInterfaceSlice';
import { fetchTestsRequest } from '../requests';
import { testsLoaded } from '../testsSlice';

export function* fetchTestsWorker() {
  try {
    yield put(loadingStarted());
    const { data } = yield call(fetchTestsRequest);
    const testsWithoutQuestions = data.tests.map(
      ({ questions, ...test }) => test
    );

    yield put(testsLoaded({ tests: testsWithoutQuestions }));
  } catch (error) {
  } finally {
    yield put(loadingFinished());
  }
}

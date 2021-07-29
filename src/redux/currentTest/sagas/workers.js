import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import { testFetched } from '../currentTestSlice';
import { fetchTestRequest } from '../requests';
import { normalizeTest } from '../normalize/normalizing';

export function* fetchTestWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { testId } = payload;
    const { data } = yield call(fetchTestRequest, testId);

    const normalized = normalizeTest(data);

    yield put(testFetched({ ...normalized }));
  } catch (error) {
    if (error.response.status === 404) {
      yield put(testFetched({ result: null, entities: null }));
    } else {
      yield put(messageReceived({ message: 'Test loading server error.' }));
    }
  } finally {
    yield put(loadingFinished());
  }
}
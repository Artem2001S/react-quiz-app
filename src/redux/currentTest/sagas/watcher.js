import { takeLatest } from 'redux-saga/effects';
import { fetchTest } from '../currentTestSlice';
import { fetchTestWorker } from './workers';

export function* watchCurrentTest() {
  yield takeLatest(fetchTest.type, fetchTestWorker);
}

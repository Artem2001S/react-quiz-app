import { all } from 'redux-saga/effects';
import { watchCurrentTest } from './currentTest/sagas/watcher';
import { watchTests } from './tests/sagas/watcher';
import { watchUser } from './userData/sagas/watcher';

export function* rootSaga() {
  yield all([watchUser(), watchTests(), watchCurrentTest()]);
}

import { all } from 'redux-saga/effects';
import { watchUser } from './userData/sagas/watcher';

export function* rootSaga() {
  yield all([watchUser()]);
}

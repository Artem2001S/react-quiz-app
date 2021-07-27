import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
} from 'redux/userInterface/userInterfaceSlice';
import { userLoginRequest } from '../requests';
import { userAuthorized } from '../userDataSlice';

export function* userLoginWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { username, password } = payload;
    const response = yield call(userLoginRequest, { username, password });
    const userData = response.data;

    yield put(userAuthorized(userData));
  } catch (error) {
    console.log('error ');
  } finally {
    yield put(loadingFinished());
  }
}

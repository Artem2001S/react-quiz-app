import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import {
  getCurrentUserRequest,
  userLoginRequest,
  userLogoutRequest,
  userSignUpRequest,
} from '../requests';
import {
  userAuthorizationChecked,
  userAuthorized,
  userExited,
} from '../userDataSlice';

export function* userLoginWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { username, password } = payload;
    const response = yield call(userLoginRequest, { username, password });
    const userData = response.data;

    yield put(userAuthorized(userData));
  } catch (error) {
    yield put(messageReceived({ message: 'Authorization error' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* checkIsAuthorizedWorker() {
  try {
    yield put(loadingStarted());
    const response = yield call(getCurrentUserRequest);
    const { data } = response;

    yield put(userAuthorized(data));
  } catch (error) {
  } finally {
    yield put(loadingFinished());
    yield put(userAuthorizationChecked());
  }
}

export function* userLogoutWorker() {
  try {
    yield put(loadingStarted());
    yield call(userLogoutRequest);
    yield put(userExited());
  } catch (error) {
  } finally {
    yield put(loadingFinished());
  }
}

export function* userSignUpWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const response = yield call(userSignUpRequest, payload);
    const data = response.data;

    yield put(userAuthorized(data));
  } catch (error) {
    yield put(messageReceived({ message: 'Registration error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

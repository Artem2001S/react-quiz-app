import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import {
  answerCreated,
  answerDeleted,
  answerUpdated,
} from '../currentTestSlice';
import {
  deleteAnswerRequest,
  patchAnswerRequest,
  postAnswerRequest,
} from '../requests';

export function* deleteAnswerWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { answerId, questionId } = payload;

    yield call(deleteAnswerRequest, answerId);
    yield put(answerDeleted({ answerId, questionId }));
  } catch (error) {
    yield put(messageReceived({ message: 'Answer deleting server error' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* patchAnswerWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { answerId, is_right, text } = payload;
    yield call(patchAnswerRequest, answerId, { is_right, text });

    yield put(answerUpdated({ answerId, changes: { is_right } }));
  } catch (error) {
    yield put(messageReceived({ message: 'Answer patching server error' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* postAnswerWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { questionId, answer } = payload;
    const { data } = yield call(postAnswerRequest, questionId, answer);

    yield put(answerCreated({ questionId, answer: data }));
  } catch (error) {
    yield put(messageReceived({ message: 'Answer posting server error' }));
  } finally {
    yield put(loadingFinished());
  }
}

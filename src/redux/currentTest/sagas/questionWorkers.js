import { all, call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import {
  questionCreated,
  questionDeleted,
  questionUpdated,
} from '../currentTestSlice';
import {
  deleteQuestionRequest,
  patchQuestionRequest,
  postAnswerRequest,
  postQuestionRequest,
} from '../requests';

export function* patchQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { questionId, title, question_type, answer } = payload;

    const { data } = yield call(patchQuestionRequest, questionId, {
      title,
      question_type,
      answer,
    });

    yield put(
      questionUpdated({
        questionId,
        changes: { title: data.title, answer: data.answer },
      })
    );
  } catch (error) {
    yield put(messageReceived({ message: 'Question patching server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* deleteQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { questionId } = payload;

    yield call(deleteQuestionRequest, questionId);

    yield put(questionDeleted({ questionId }));
  } catch (error) {
    yield put(messageReceived({ message: 'Question deleting server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* postQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { testId, question } = payload;

    const { data: createdQuestion } = yield call(postQuestionRequest, testId, {
      title: question.title,
      question_type: question.question_type,
      answer: question.answer,
    });

    if (question.answers) {
      const calls = question.answers.map((answer) =>
        call(postAnswerRequest, createdQuestion.id, answer)
      );
      const createdAnswers = yield all(calls);
      createdQuestion.answers = createdAnswers.map(({ data }) => data);
    }

    yield put(questionCreated(createdQuestion));
  } catch (error) {
    yield put(messageReceived({ message: 'Question posting server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

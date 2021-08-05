import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAnswerPosition,
  deleteAnswer as deleteAnswerAction,
  deleteQuestion as deleteQuestionAction,
  deleteTest,
  fetchTest,
  patchAnswer,
  patchQuestion,
  patchTest,
  postAnswer,
  postQuestion,
} from 'redux/currentTest/currentTestSlice';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import {
  getCurrentTestSelector,
  getIsCurrentTestFetchedSelector,
} from 'redux/currentTest/selectors';
import PropTypes from 'prop-types';
import Test from 'components/Test/Test';
import Title from 'components/UI/Title/Title';
import Container from 'components/UI/Container/Container';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';

const TestContainer = ({ testId }) => {
  const dispatch = useDispatch();
  const currentTest = useSelector(getCurrentTestSelector);
  const isTestFetched = useSelector(getIsCurrentTestFetchedSelector);

  useComponentDidMount(() => dispatch(fetchTest({ testId })));

  const handleDeleteTestBtnClick = useCallback(
    () => dispatch(deleteTest({ id: testId })),
    [dispatch, testId]
  );

  const patchTestTitle = useCallback(
    (newTitle) => dispatch(patchTest({ testId, title: newTitle })),
    [dispatch, testId]
  );

  const deleteAnswer = useCallback(
    (answerId, questionId) =>
      dispatch(deleteAnswerAction({ answerId, questionId })),
    [dispatch]
  );

  const toggleAnswerIsRight = useCallback(
    (answerId, answer, questionId) =>
      dispatch(
        patchAnswer({
          answerId,
          is_right: !answer.is_right,
          text: answer.text,
          questionId,
        })
      ),
    [dispatch]
  );

  const updateAnswerText = useCallback(
    (answerId, answer, newText) =>
      dispatch(
        patchAnswer({ answerId, is_right: answer.is_right, text: newText })
      ),
    [dispatch]
  );

  const updateQuestionTitle = useCallback(
    (questionId, title, questionType) =>
      dispatch(
        patchQuestion({ questionId, title, question_type: questionType })
      ),
    [dispatch]
  );

  const updateQuestionAnswer = useCallback(
    (questionId, title, questionType, answer) =>
      dispatch(
        patchQuestion({
          questionId,
          title,
          question_type: questionType,
          answer,
        })
      ),
    [dispatch]
  );

  const deleteQuestion = useCallback(
    (questionId) => dispatch(deleteQuestionAction({ questionId })),
    [dispatch]
  );

  const createQuestion = useCallback(
    (testId, question) => dispatch(postQuestion({ testId, question })),
    [dispatch]
  );

  const createAnswer = useCallback(
    (questionId, answerText) =>
      dispatch(
        postAnswer({
          questionId,
          answer: { text: answerText, is_right: false },
        })
      ),
    [dispatch]
  );

  const moveAnswer = useCallback(
    (newPosition, answerId, questionId) =>
      dispatch(changeAnswerPosition({ newPosition, answerId, questionId })),
    [dispatch]
  );

  return isTestFetched ? (
    <>
      {currentTest && isTestFetched ? (
        <Test
          test={currentTest}
          onTestTitleUpdate={patchTestTitle}
          onAnswerDelete={deleteAnswer}
          onAnswerIsRightToggle={toggleAnswerIsRight}
          onNewAnswerFormSubmit={createAnswer}
          onAnswerTextChanged={updateAnswerText}
          onQuestionTitleUpdate={updateQuestionTitle}
          onQuestionDelete={deleteQuestion}
          onQuestionAnswerUpdate={updateQuestionAnswer}
          onAnswerPositionChanged={moveAnswer}
          onNewQuestionFormSubmit={createQuestion}
          onDeleteTestBtnClick={handleDeleteTestBtnClick}
        />
      ) : (
        <Container centered>
          <Title large>Test not found</Title>
          <ButtonLink to="/tests">Go to tests</ButtonLink>
        </Container>
      )}
    </>
  ) : null;
};

TestContainer.propTypes = {
  testId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(TestContainer);

import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { TestContextProvider } from './TestContext';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import Questions from './Questions/Questions';
import NewQuestionForm from './NewQuestionForm/NewQuestionForm';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import classes from './Test.module.scss';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';

const Test = ({
  test,
  onTestTitleUpdate,
  onAnswerDelete,
  onAnswerIsRightToggle,
  onQuestionTitleUpdate,
  onQuestionDelete,
  onNewQuestionFormSubmit,
  onNewAnswerFormSubmit,
  onAnswerTextChanged,
  onAnswerPositionChanged,
  onQuestionAnswerUpdate,
}) => {
  const { isAdmin } = useAuth();

  return (
    <TestContextProvider
      onAnswerDelete={onAnswerDelete}
      onAnswerIsRightToggle={onAnswerIsRightToggle}
      onQuestionTitleUpdate={onQuestionTitleUpdate}
      onQuestionDelete={onQuestionDelete}
      onQuestionAnswerUpdate={onQuestionAnswerUpdate}
      onNewAnswerFormSubmit={onNewAnswerFormSubmit}
      onAnswerTextChanged={onAnswerTextChanged}
      onAnswerPositionChanged={onAnswerPositionChanged}
    >
      <Container>
        <ButtonLink className={classes.BackBtn} to="/tests">
          {'<'} Tests
        </ButtonLink>
        <div className={classes.TestHeader}>
          {isAdmin ? (
            <EditableInput
              initialValue={test.title}
              onSubmit={onTestTitleUpdate}
            >
              <Title large centered>
                {test.title}
              </Title>
            </EditableInput>
          ) : (
            <Title large centered>
              {test.title}
            </Title>
          )}
        </div>
        <ButtonLink className={classes.StartQuizBtn} to={`/quiz/${test.id}`}>
          Start quiz
        </ButtonLink>
        {isAdmin && (
          <NewQuestionForm
            testId={test.id}
            onSubmit={onNewQuestionFormSubmit}
          />
        )}
        <Questions questions={test.questions} />
      </Container>
    </TestContextProvider>
  );
};

export default React.memo(Test);

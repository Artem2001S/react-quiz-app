import React from 'react';
import { useAuth } from 'hooks/useAuth';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import Questions from './Questions/Questions';
import { TestContextProvider } from './TestContext';
import classes from './Test.module.scss';
import NewQuestionForm from './NewQuestionForm/NewQuestionForm';

const Test = ({
  test,
  isEditMode,
  input,
  onEditModeChanged,
  onSaveTitleBtnClick,
  onAnswerDelete,
  onAnswerIsRightToggle,
  onQuestionTitleUpdate,
  onQuestionDelete,
  onNewQuestionFormSubmit,
}) => {
  const { isAdmin } = useAuth();

  return (
    <TestContextProvider
      onAnswerDelete={onAnswerDelete}
      onAnswerIsRightToggle={onAnswerIsRightToggle}
      onQuestionTitleUpdate={onQuestionTitleUpdate}
      onQuestionDelete={onQuestionDelete}
    >
      <Container>
        <div className={classes.TestHeader}>
          <Title large>{test?.title}</Title>
          {isAdmin && (
            <>
              <Button onClick={onEditModeChanged}>
                {!isEditMode ? 'Edit' : 'Cancel'}
              </Button>
              {isEditMode && (
                <>
                  <Input {...input} />
                  <Button onClick={onSaveTitleBtnClick}>Save</Button>
                </>
              )}
            </>
          )}
        </div>
        <NewQuestionForm testId={test.id} onSubmit={onNewQuestionFormSubmit} />
        <Questions questions={test.questions} />
      </Container>
    </TestContextProvider>
  );
};

export default React.memo(Test);

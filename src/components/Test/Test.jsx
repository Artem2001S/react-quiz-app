import React, { useCallback, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { TestContextProvider } from './TestContext';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import Questions from './Questions/Questions';
import NewQuestionForm from './NewQuestionForm/NewQuestionForm';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import Button from 'components/UI/Button/Button';
import classes from './Test.module.scss';
import Modal from 'components/UI/Modal/Modal';

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
  onDeleteTestBtnClick,
  onQuestionAnswerUpdate,
}) => {
  const { isAdmin } = useAuth();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const hideDeleteModal = useCallback(() => setIsDeleteModalVisible(false), []);
  const showDeleteModal = useCallback(() => setIsDeleteModalVisible(true), []);

  const handleDeleteTestBtnClick = useCallback(() => {
    hideDeleteModal();
    onDeleteTestBtnClick();
  }, [hideDeleteModal, onDeleteTestBtnClick]);

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
            <>
              <EditableInput
                initialValue={test.title}
                onSubmit={onTestTitleUpdate}
              >
                <Title large centered>
                  {test.title}
                </Title>
              </EditableInput>
              <Button
                onClick={showDeleteModal}
                className={classes.Delete}
                danger
                small
              >
                Delete
              </Button>
              <Modal
                title="Delete test ?"
                isVisible={isDeleteModalVisible}
                hideModal={hideDeleteModal}
              >
                <div className={classes.ModalContent}>
                  <Button danger onClick={handleDeleteTestBtnClick}>
                    Delete
                  </Button>
                  <Button onClick={hideDeleteModal}>Cancel</Button>
                </div>
              </Modal>
            </>
          ) : (
            <Title large centered>
              {test.title}
            </Title>
          )}
        </div>
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

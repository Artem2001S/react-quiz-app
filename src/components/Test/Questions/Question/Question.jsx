import React, { useState, useCallback } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useTestCtx } from 'components/Test/TestContext';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import Title from 'components/UI/Title/Title';
import Answers from './Answers/Answers';
import Button from 'components/UI/Button/Button';
import classes from './Question.module.scss';
import classNames from 'classnames';
import Modal from 'components/UI/Modal/Modal';

const Question = ({ question, testId }) => {
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const hideDeleteModal = useCallback(() => setIsDeleteModalVisible(false), []);
  const showDeleteModal = useCallback(() => setIsDeleteModalVisible(true), []);

  const { isAdmin } = useAuth();

  const { onQuestionTitleUpdate, onQuestionDelete } = useTestCtx();

  const handleTitleUpdate = useCallback(
    (newTitle) => {
      onQuestionTitleUpdate(question.id, newTitle, question.question_type);
    },
    [onQuestionTitleUpdate, question]
  );

  const handleQuestionDelete = useCallback(() => {
    hideDeleteModal();
    onQuestionDelete(question.id);
  }, [hideDeleteModal, onQuestionDelete, question]);

  const toggleAnswersVisible = useCallback(
    () => setIsAnswersVisible(!isAnswersVisible),
    [isAnswersVisible]
  );

  const toggleBtnClasses = classNames(
    { [classes.Closed]: !isAnswersVisible },
    { [classes.Opened]: isAnswersVisible },
    classes.ToggleBtn
  );

  return (
    <div className={classes.Question}>
      <div className={classes.Header}>
        <div className={toggleBtnClasses} onClick={toggleAnswersVisible} />

        {isAdmin ? (
          <div className={classes.HeaderContent}>
            <EditableInput
              className={classes.QuestionTitle}
              initialValue={question.title}
              onSubmit={handleTitleUpdate}
            >
              <Title small>
                {question.title}
                <span className={classes.QuestionType}>
                  {question.question_type}
                </span>
              </Title>
            </EditableInput>
            <Button small danger onClick={showDeleteModal}>
              &times;
            </Button>
          </div>
        ) : (
          <Title small>{question.title}</Title>
        )}
      </div>
      {isAnswersVisible && <Answers question={question} />}
      <Modal
        title="Delete question ?"
        isVisible={isDeleteModalVisible}
        hideModal={hideDeleteModal}
      >
        <div className={classes.ModalContent}>
          <Button danger onClick={handleQuestionDelete}>
            Delete
          </Button>
          <Button onClick={hideDeleteModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(Question);

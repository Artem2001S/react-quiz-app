import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTestCtx } from 'components/Test/TestContext';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import Title from 'components/UI/Title/Title';
import Answers from './Answers/Answers';
import Button from 'components/UI/Button/Button';
import Modal from 'components/UI/Modal/Modal';
import classes from './Question.module.scss';

const Question = ({ question, testId }) => {
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const hideDeleteModal = useCallback(() => setIsDeleteModalVisible(false), []);
  const showDeleteModal = useCallback(() => setIsDeleteModalVisible(true), []);

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

Question.propTypes = {
  question: PropTypes.object,
  testId: PropTypes.number,
};

export default React.memo(Question);

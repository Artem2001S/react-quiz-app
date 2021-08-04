import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useTestCtx } from 'components/Test/TestContext';
import Button from 'components/UI/Button/Button';
import EditableInput from 'components/UI/EditableInput/EditableInput';
import Modal from 'components/UI/Modal/Modal';
import classes from './Answer.module.scss';

const Answer = ({
  answer,
  isDeletingAvailable,
  isSingleQuestion,
  questionId,
}) => {
  const { onAnswerDelete, onAnswerIsRightToggle, onAnswerTextChanged } =
    useTestCtx();

  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const showDeleteModal = useCallback(() => setIsDeleteModalOpened(true), []);
  const hideDeleteModal = useCallback(() => setIsDeleteModalOpened(false), []);

  const handleDeleteBtnClick = useCallback(() => {
    onAnswerDelete(answer.id, questionId);
    hideDeleteModal();
  }, [answer, hideDeleteModal, onAnswerDelete, questionId]);

  const handleToggleIsRightBtnClick = useCallback(
    () => onAnswerIsRightToggle(answer.id, answer, questionId),
    [answer, onAnswerIsRightToggle, questionId]
  );

  const toggleBtnClasses = classNames({
    [classes.RightAnswerToggleBtn]: answer.is_right,
    [classes.NotRightAnswerToggleBtn]: !answer.is_right,
  });

  const handleAnswerTextChanged = useCallback(
    (newText) => onAnswerTextChanged(answer.id, answer, newText),
    [answer, onAnswerTextChanged]
  );

  return (
    <div className={classes.Answer}>
      <EditableInput
        initialValue={answer.text}
        onSubmit={handleAnswerTextChanged}
      >
        <div className={classes.Text}>{answer.text}</div>
      </EditableInput>

      <div className={classes.Actions}>
        <Button
          className={toggleBtnClasses}
          title="Toggle is answer right"
          small
          onClick={handleToggleIsRightBtnClick}
        >
          &#10003;
        </Button>
        <Button
          small
          danger
          title="Delete this answer"
          onClick={showDeleteModal}
          disabled={
            !isDeletingAvailable || (isSingleQuestion && answer.is_right)
          }
        >
          &times;
        </Button>
        <Modal
          title="Delete answer ?"
          isVisible={isDeleteModalOpened}
          hideModal={hideDeleteModal}
        >
          <div className={classes.ModalContent}>
            <Button danger onClick={handleDeleteBtnClick}>
              Delete
            </Button>
            <Button onClick={hideDeleteModal}>Cancel</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default React.memo(Answer);

import React, { useState, useCallback } from 'react';
import Title from 'components/UI/Title/Title';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import Modal from 'components/UI/Modal/Modal';
import classes from './TestsListItem.module.scss';
import Button from 'components/UI/Button/Button';

const TestsListItem = ({ id, title, created_at }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const hideModal = useCallback(() => setIsModalOpened(false), []);
  const showModal = useCallback(() => setIsModalOpened(true), []);

  return (
    <div className={classes.TestsListItem} onClick={showModal}>
      <div className={classes.Title}>
        <Title small>{title}</Title>
        <span className={classes.CreatedAt}>
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>
      <div className={classes.Actions}>
        <ButtonLink to={`/tests/${id}`}>Open</ButtonLink>
      </div>
      <Modal
        isVisible={isModalOpened}
        title="Open quiz page ?"
        hideModal={hideModal}
      >
        <div className={classes.ModalContent}>
          <ButtonLink to={`/quiz/${id}`}>Yes!</ButtonLink>
          <Button onClick={hideModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(TestsListItem);

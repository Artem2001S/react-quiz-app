import React, { useCallback, useEffect, useRef } from 'react';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import Title from '../Title/Title';
import classes from './Modal.module.scss';

const Modal = ({ title, isVisible, hideModal, children }) => {
  const targetElement = useRef();

  useEffect(() => {
    isVisible
      ? disableBodyScroll(targetElement)
      : enableBodyScroll(targetElement);
    return () => clearAllBodyScrollLocks();
  }, [isVisible]);

  const handleKeyPress = useCallback(
    (e) => e.key === 'Escape' && hideModal(),
    [hideModal]
  );

  useEffect(() => {
    isVisible && document.addEventListener('keyup', handleKeyPress);
    return () => document.removeEventListener('keyup', handleKeyPress);
  }, [handleKeyPress, isVisible]);

  const backgroundClickHandler = useCallback(
    (e) => {
      e.stopPropagation();
      hideModal();
    },
    [hideModal]
  );

  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  return isVisible ? (
    <div className={classes.Modal} onClick={backgroundClickHandler}>
      <div className={classes.CloseBtn}>&times;</div>
      <div className={classes.ModalContent} onClick={stopPropagation}>
        {title && (
          <Title small centered>
            {title}
          </Title>
        )}
        <div className={classes.Divider} />
        {children}
      </div>
    </div>
  ) : null;
};

export default React.memo(Modal);

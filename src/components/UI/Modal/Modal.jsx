import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import Title from '../Title/Title';
import classes from './Modal.module.scss';

const Modal = ({
  title,
  isVisible,
  showCloseBtn = true,
  children,
  hideModal = () => {},
}) => {
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
      {showCloseBtn && <div className={classes.CloseBtn}>&times;</div>}
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

Modal.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  showCloseBtn: PropTypes.bool,
  children: PropTypes.node,
  hideModal: PropTypes.func,
};

export default React.memo(Modal);

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Draggable.module.scss';

const Draggable = ({
  children,
  isDragging,
  index,
  onDragStart,
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  const handleDragStart = useCallback(
    (e) => onDragStart(e, index),
    [index, onDragStart]
  );

  const handleDragOver = useCallback(
    (e) => onDragOver(e, index),
    [index, onDragOver]
  );

  const draggableClasses = classNames(
    { [classes.Dragging]: isDragging },
    classes.Draggable
  );

  return (
    <div className={draggableClasses}>
      <div
        className={classes.DragIcon}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onDragLeave={onDragLeave}
        onDragOver={handleDragOver}
        onDrop={onDrop}
      >
        <span className={classes.Point} />
        <span className={classes.Point} />
        <span className={classes.Point} />
        <span className={classes.Point} />
        <span className={classes.Point} />
        <span className={classes.Point} />
      </div>
      {children}
    </div>
  );
};

Draggable.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  isDragging: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
};

export default React.memo(Draggable);

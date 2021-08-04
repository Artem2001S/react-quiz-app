import classNames from 'classnames';
import React, { useCallback } from 'react';
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

export default React.memo(Draggable);

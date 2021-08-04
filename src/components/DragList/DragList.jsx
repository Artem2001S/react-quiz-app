import React, { useState, useCallback } from 'react';
import Draggable from './Draggable/Draggable';

const DragList = ({ children, onItemDrop }) => {
  const [dragFrom, setDragFrom] = useState(-1);
  const [dragTo, setDragTo] = useState(-1);

  const resetDragTo = useCallback(() => setDragTo(-1), []);

  const onDragStart = useCallback((e, index) => setDragFrom(index), []);

  const onDragEnd = useCallback(resetDragTo, [resetDragTo]);
  const onDragLeave = useCallback(resetDragTo, [resetDragTo]);

  const onDragOver = useCallback(
    (e, index) => {
      e.preventDefault();
      index !== dragTo && setDragTo(index);
    },
    [dragTo]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      onItemDrop(dragFrom, dragTo);
    },
    [dragFrom, dragTo, onItemDrop]
  );

  return children.map((node, index) => (
    <Draggable
      key={index}
      index={index}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      isDragging={index === dragTo}
    >
      {node}
    </Draggable>
  ));
};

export default React.memo(DragList);

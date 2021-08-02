import React from 'react';
import classes from './TestsListItem.module.scss';
import Title from 'components/UI/Title/Title';
import Button from 'components/UI/Button/Button';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import { useCallback } from 'react';

const TestsListItem = ({ id, title, created_at, isAdmin, onDelete }) => {
  const handleDeleteBtnClick = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <div className={classes.TestsListItem}>
      <div className={classes.Title}>
        <Title small>{title}</Title>
        <span className={classes.CreatedAt}>
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>
      <div className={classes.Actions}>
        {isAdmin && (
          <Button danger small onClick={handleDeleteBtnClick}>
            &times;
          </Button>
        )}

        <ButtonLink to={`/tests/${id}`}>Open</ButtonLink>
      </div>
    </div>
  );
};

export default React.memo(TestsListItem);

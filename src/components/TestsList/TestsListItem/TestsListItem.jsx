import React from 'react';
import classes from './TestsListItem.module.scss';
import Title from 'components/UI/Title/Title';
import Button from 'components/UI/Button/Button';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';

const TestsListItem = ({ id, title, createdAt, isAdmin }) => {
  return (
    <div className={classes.TestsListItem}>
      <div className={classes.Title}>
        <Title small>{title}</Title>
      </div>
      <div className={classes.Actions}>
        {isAdmin && (
          <Button danger small>
            &times;
          </Button>
        )}

        <ButtonLink to={`/tests/${id}`}>Open</ButtonLink>
      </div>
    </div>
  );
};

export default TestsListItem;

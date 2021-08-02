import React from 'react';
import Title from 'components/UI/Title/Title';
import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import classes from './TestsListItem.module.scss';

const TestsListItem = ({ id, title, created_at }) => (
  <div className={classes.TestsListItem}>
    <div className={classes.Title}>
      <Title small>{title}</Title>
      <span className={classes.CreatedAt}>
        {new Date(created_at).toLocaleDateString()}
      </span>
    </div>
    <div className={classes.Actions}>
      <ButtonLink to={`/tests/${id}`}>Open</ButtonLink>
    </div>
  </div>
);

export default React.memo(TestsListItem);

import React from 'react';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import TestsListItem from './TestsListItem/TestsListItem';
import classes from './TestsList.module.scss';
import sortIconSrc from './sort.svg';
import Button from 'components/UI/Button/Button';

const TestsList = ({ tests, isAdmin, testsCount, onDelete, onSortChange }) => {
  return (
    <Container>
      <div className={classes.Header}>
        <Title large>Tests</Title>
        <Button
          className={classes.SortBtn}
          title="Toggle sort"
          small
          onClick={onSortChange}
        >
          <img src={sortIconSrc} width="30" alt="Toggle sort" />
        </Button>
      </div>
      <div className={classes.TestsCount}>Tests count: {testsCount}</div>
      {!tests?.length && (
        <Title centered medium>
          Tests not found
        </Title>
      )}
      <div className={classes.TestsList}>
        {tests.map((test) => (
          <TestsListItem
            isAdmin={isAdmin}
            key={test.id}
            {...test}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Container>
  );
};

export default React.memo(TestsList);

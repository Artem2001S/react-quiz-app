import React from 'react';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';
import TestsListItem from './TestsListItem/TestsListItem';
import classes from './TestsList.module.scss';

const TestsList = ({ tests, isAdmin }) => {
  return (
    <Container>
      <Title large>Tests</Title>
      {!tests?.length && (
        <Title centered medium>
          Tests not found
        </Title>
      )}
      <div className={classes.TestsList}>
        {tests.map((test) => (
          <TestsListItem isAdmin={isAdmin} key={test.id} {...test} />
        ))}
      </div>
    </Container>
  );
};

export default React.memo(TestsList);

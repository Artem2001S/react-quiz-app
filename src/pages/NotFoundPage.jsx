import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/UI/Container/Container';
import Title from 'components/UI/Title/Title';

const NotFoundPage = () => (
  <Container>
    <Title large>Page not found</Title>
    <Title small>
      Go to{' '}
      <Link to="/" style={{ color: 'inherit' }}>
        home page
      </Link>
    </Title>
  </Container>
);

export default React.memo(NotFoundPage);

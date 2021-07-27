import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import Container from 'components/UI/Container/Container';
import Logo from 'components/UI/Logo/Logo';
import React from 'react';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.Header}>
      <Container>
        <div className={classes.HeaderInner}>
          <Logo />
          <div className={classes.RightSide}>
            <ButtonLink to="/login">Sign in</ButtonLink>
            <ButtonLink to="/signup">Sign up</ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

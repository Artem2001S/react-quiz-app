import ButtonLink from 'components/UI/ButtonLink/ButtonLink';
import Container from 'components/UI/Container/Container';
import Logo from 'components/UI/Logo/Logo';
import React from 'react';
import classes from './Header.module.scss';
import UserBar from './UserBar/UserBar';

const Header = ({ user, isAdmin, onLogout }) => {
  return (
    <div className={classes.Header}>
      <Container>
        <div className={classes.HeaderInner}>
          <Logo />
          <div className={classes.RightSide}>
            {user ? (
              <UserBar
                userName={user.username}
                onLogout={onLogout}
                isAdmin={isAdmin}
              />
            ) : (
              <>
                <ButtonLink to="/login">Sign in</ButtonLink>
                <ButtonLink to="/signup">Sign up</ButtonLink>{' '}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(Header);

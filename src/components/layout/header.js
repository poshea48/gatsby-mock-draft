import React from 'react';
import Link from 'gatsby-link';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { toggleDrawer as toggleDrawerAction } from '../../state/actions/appActions';
import Hamburger from './hamburger';

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const GroupedIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AuthButtons = styled(GroupedIcons)`
  width: 35%;
  padding: 10px 0;
  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const MenuIcon = styled.a`
  padding: 0 5px;
  align-self: center;
  cursor: pointer;
`;

const Navbar = styled.header`
  height: ${p => p.theme.size(4)};
  width: 100%;
  display: flex;
  align-items: center;
  z-index: ${p => p.theme.zIndex.header};
  padding: 0 1em;
  background: ${p => p.theme.color.navigation};
  @media (max-width: 420px) {
    padding: 0 0.3em;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  height: ${p => p.theme.size(4)};
  z-index: ${p => p.theme.zIndex.header + 25};
`;

const Title = styled.h2`
  color: ${p => p.theme.palette.primary.contrast};
  font-size: 30px;
  margin: 9px 0;
  white-space: nowrap;
  @media (max-width: 420px) {
    font-size: 24px;
    margin: 25px 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  background: ${p => p.theme.color.auth};
  border-radius: 10px;
  width: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  &:first-of-type {
    margin-right: 0.5em;
  }
  @media (max-width: 420px) {
    width: 100%;
    &:first-of-type {
      margin-bottom: 0.2em;
    }
  }
`;

const Header = ({ isDrawerOpen, toggleDrawer, siteTitle }) => (
  <Navbar isDrawerOpen={isDrawerOpen}>
    <Grid>
      <GroupedIcons>
        <MenuIcon
          isDrawerOpen={isDrawerOpen}
          href="#"
          onClick={() => toggleDrawer(!isDrawerOpen)}
          style={{ marginRight: '.5em' }}
        >
          <Hamburger />
        </MenuIcon>
        <StyledLink to="/">
          <Title>{siteTitle}</Title>
        </StyledLink>
      </GroupedIcons>
      <AuthButtons>
        <Button>
          <StyledLink to="#">Log in</StyledLink>
        </Button>
        <Button>
          <StyledLink to="#">Register</StyledLink>
        </Button>
      </AuthButtons>
    </Grid>
  </Navbar>
);

export default connect(
  state => ({ isDrawerOpen: state.app.isDrawerOpen }),
  dispatch => ({ toggleDrawer: open => dispatch(toggleDrawerAction(open)) }),
)(Header);

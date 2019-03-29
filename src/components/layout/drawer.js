import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Hamburger from './hamburger';
import { Link } from 'gatsby';
import { toggleDrawer as toggleDrawerAction } from '../../state/actions/appActions';

const Paper = styled.aside`
  position: fixed;
  z-index: ${p => p.theme.zIndex.drawer};
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${p => p.theme.size(16)};
  background: ${p => p.theme.palette.secondary.main};
  transition: transform 0.3s ease-in-out;
  transform: translateX(${p => (p.isDrawerOpen ? 0 : `-${p.theme.size(16)}`)});
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: ${p => p.theme.size(4)};
  background: ${p => p.theme.palette.secondary.dark};
  padding-left: 1rem;
`;

const Item = styled(Link)`
  color: ${p => p.theme.palette.secondary.contrast};
  padding: 0.5rem 1rem;
  transition: background-color 0.1s ease-out;
  &:hover {
    background: ${p => p.theme.palette.secondary.dark};
  }
  cursor: pointer;
`;

const items = [
  { url: '/', name: 'Home' },
  { url: '/nfl/draftroom/', name: 'Draftroom' },
];

const Drawer = ({ isDrawerOpen, toggleDrawer }) => (
  <Paper isDrawerOpen={isDrawerOpen}>
    <Header onClick={() => toggleDrawer(false)}>
      <Hamburger />
    </Header>
    {items.map(item => (
      <Item key={item.url} to={item.url} onClick={() => toggleDrawer(false)}>
        {item.name}
      </Item>
    ))}
  </Paper>
);

export default connect(
  state => ({ isDrawerOpen: state.app.isDrawerOpen }),
  dispatch => ({ toggleDrawer: open => dispatch(toggleDrawerAction(open)) }),
)(Drawer);

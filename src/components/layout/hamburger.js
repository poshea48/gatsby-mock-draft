import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { toggleDrawer as toggleDrawerAction } from '../../state/actions/appActions';

const Hamburger = styled.span`
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isDrawerOpen ? 'scale(0.7)' : 'scale(0.9)')};
`;

const Line = styled.span`
  width: 35px;
  height: 3px;
  background-color: white;
  display: block;
  margin: 9px auto;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 420px) {
    width: 25px;
    height: 3px;
  }
`;

const Menu = ({ isDrawerOpen }) => (
  <Hamburger isDrawerOpen={isDrawerOpen}>
    <Line />
    <Line />
    <Line />
  </Hamburger>
);

export default connect(
  state => ({ isDrawerOpen: state.app.isDrawerOpen }),
  dispatch => ({ toggleDrawer: open => dispatch(toggleDrawerAction(open)) }),
)(Menu);

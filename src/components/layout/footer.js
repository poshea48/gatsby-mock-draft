import React from 'react';
import styled from '@emotion/styled';

const MenuIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${p => p.theme.size(1)};
  align-self: stretch;
  transition: right 0.3s ease-in-out;
  left: ${p => (p.isDrawerOpen ? p.theme.size(1) : `-${p.theme.size(4)}`)};
`;

const Navbar = styled.header`
  height: ${p => p.theme.size(4)};
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${p => p.theme.zIndex.header};
  background: ${p => p.theme.color.navigation};
`;

const Title = styled.h2`
  color: ${p => p.theme.palette.primary.contrast};
  font-size: ${p => p.theme.size(1)};
  margin-bottom: 0;
  z-index: ${p => p.theme.zIndex.header + 10};
  white-space: nowrap;
  @media (min-width: 420px) {
    font-size: ${p => p.theme.size(1)};
  }
`;

const Footer = ({ author, createdAt }) => (
  <Navbar>
    <Title>
      Built by {author}, {createdAt}
    </Title>
  </Navbar>
);

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../style/theme';
import { toggleDrawer as toggleDrawerAction } from '../../state/actions/appActions';
import Header from './header';
import Drawer from './drawer';
import Footer from './footer';

// import './layout.css';
// import './reset.css';

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #6495ED;
  /* background: linear-gradient(
    to left,
    ${p => (p.background ? p.theme.background[p.background].primary : `#fff`)}
      0%,
    ${p =>
      p.background ? p.theme.background[p.background].secondary1 : `#fff`}
      100%
  ); */
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s ease-in-out;
  transform: perspective(200px)
    ${p =>
      p.isDrawerOpen
        ? `translateX(${p.theme.size(8)}) translateZ(-20px)`
        : 'none'};
  padding-top: ${p => p.theme.size(1)};
  padding-left: ${p => p.theme.size(1)};
  padding-right: ${p => p.theme.size(1)};
  flex: 1 auto;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: ${p => p.theme.zIndex.overlay};
  top: 0;
  left: 0;
  background: black;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
  opacity: ${p => (p.isDrawerOpen ? 0.5 : 0)};
  pointer-events: ${p => (p.isDrawerOpen ? 'all' : 'none')};
`;

const Layout = ({ children, isDrawerOpen, toggleDrawer, background }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              author
              createdAt
            }
          }
        }
      `}
      render={data => (
        <ThemeProvider theme={theme}>
          <Container background={background}>
            <Header siteTitle={data.site.siteMetadata.title} />

            <Content isDrawerOpen={isDrawerOpen}>{children}</Content>
            <Footer
              author={data.site.siteMetadata.author}
              createdAt={data.site.siteMetadata.createdAt}
            />
          </Container>

          <Overlay
            isDrawerOpen={isDrawerOpen}
            onClick={() => toggleDrawer(false)}
          />
          <Drawer />
        </ThemeProvider>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(
  state => ({ isDrawerOpen: state.app.isDrawerOpen }),
  dispatch => ({ toggleDrawer: open => dispatch(toggleDrawerAction(open)) }),
)(Layout);

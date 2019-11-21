import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout/';
import SEO from '../components/common/seo';
import BackgroundImg from '../components/common/backgroundImg.js';

const colors = {
  outerSpace: '#404e4d',
  wenge: '#63595c',
  paynesGrey: '#646881',
  moonstoneBlue: '#62bec1',
  mayablue: '#5ad2f4',
};

const colors2 = {
  eerieBlack: '#1c1d21',
  vanDykeBrown: '#634133',
  dodgerBlue: '#2191fb',
  gray: '#bebbbb',
  cadetGrey: '#93a3b1',
};
const Container = styled.div`
  display: flex;
  /* background: ${colors2.vanDykeBrown}; */
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  color: ${colors2.gray};
  margin-bottom: 0;
  font-family: 'Gill Sans', sans-serif;
  font-size: 3em;
  text-shadow: 0 10px 5px ${colors2.eerieBlack};
`;

const MainTitle = styled.h1`
  color: ${colors2.dodgerBlue};
  font-size: 4em;
  text-shadow: 0 10px 5px ${colors2.eerieBlack};
  margin: 10px 0;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors2.eerieBlack};
  cursor: ${p => (p.disabled ? `not-allowed` : `pointer`)};
  pointer-events: ${p => (p.disabled ? `none` : `auto`)};
`;

const Button = styled.button`
  background: ${colors2.cadetGrey};
  box-shadow: 5px 5px 5px ${colors2.eerieBlack};
  padding: 5px;
  border-radius: 10px;
  width: 160px;
  font-size: 0.8rem;
  align-self: center;
  margin: 0.5em;
  transition: all 0.3s ease-in-out;

  &:disabled {
    background-color: ${colors2.eerieBlack};
    cursor: not-allowed;
    box-shadow: none;
    transform: translateX(2px) translateY(2px);
    a {
      cursor: not-allowed;
      color: ${colors2.cadetGrey};
    }
  }

  &:hover {
    box-shadow: none;
    transform: translateX(2px) translateY(2px);
  }
`;
const IndexPage = () => (
  <BackgroundImg>
    <Container>
      <Title>Mock Draft</Title>
      <SEO title="Home" keywords={[`Mock Draft`, `NFL`, `Fantasy Football`]} />

      <MainTitle>NFL</MainTitle>

      <LinksContainer>
        <Button color="nflBlue" disabled>
          <StyledLink to="/nfl/draftroom">NFL Draftroom</StyledLink>
        </Button>
        <Button color="nflBlue">
          <StyledLink to="/fantasy/draftroom">Fantasy Draftroom</StyledLink>
        </Button>
        <Button color="nflBlue">
          <StyledLink to="/setup">New Draftroom</StyledLink>
        </Button>
      </LinksContainer>
      <MainTitle>Fantasy Football</MainTitle>
    </Container>
  </BackgroundImg>
);

export default IndexPage;

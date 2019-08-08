import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout/';
import SEO from '../components/common/seo';
import BackgroundImg from '../components/common/backgroundImg.js';

const colors = {
  nflBlue: '#013369',
  nflRed: '#d50a0a',
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  color: #fff;
  font-family: 'Gill Sans', sans-serif;
  margin-bottom: 40px;
  font-size: 3em;
  text-shadow: 0 10px 5px rgba(0, 0, 0, 1);
`;

const MainTitle = styled.h1`
  color: #d50a0a;
  font-size: 4em;
  text-shadow: 0 10px 5px rgba(0, 0, 0, 1);
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
  color: white;
  cursor: ${p => (p.disabled ? `not-allowed` : `pointer`)};
  pointer-events: ${p => (p.disabled ? `none` : `auto`)};
`;

const Button = styled.button`
  background: ${p => colors[p.color]};
  padding: 5px;
  border-radius: 10px;
  width: 160px;
  font-size: 0.8rem;
  align-self: center;
  margin: 0.5em;

  &:disabled {
    background-color: ${colors.nflRed};
    cursor: not-allowed;
  }
`;
const IndexPage = () => (
  <BackgroundImg>
    <Title>Mock Draft</Title>

    <Container>
      <SEO title="Home" keywords={[`Mock Draft`, `NFL`, `Fantasy Football`]} />

      <MainTitle>NFL</MainTitle>

      <LinksContainer>
        <Button color="nflBlue">
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

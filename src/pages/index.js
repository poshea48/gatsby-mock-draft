import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout/';
import SEO from '../components/seo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-top: 100px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  background: ${p => p.theme.color.primary};
  padding: 5px;
  border-radius: 10px;
  width: 160px;
  font-size: 0.8rem;
  align-self: center;
  margin: 0.5em;
`;
const IndexPage = () => (
  <Layout>
    <Container>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Mock Draft App</h1>
      <h3>This will be initial startup page</h3>
      <LinksContainer>
        <Button>
          <StyledLink to="/nfl/draftroom">My NFL Draftroom</StyledLink>
        </Button>
        <Button>
          <StyledLink to="/fantasy/draftroom">My Fantasy Draftroom</StyledLink>
        </Button>
        <Button>
          <StyledLink to="/setup">Setup a New Draft</StyledLink>
        </Button>
      </LinksContainer>
    </Container>
  </Layout>
);

export default IndexPage;

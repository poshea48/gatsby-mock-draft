import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #040e18;
`;
const BgImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  filter: brightness(110%) saturate(2) contrast(70%);
  ${'' /* background-position: 6% 100%; */}
  & > img {
    width: 100%:
    height: 100%:
    object-fit: contain !important;
    object-position: right bottom !important;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;
const BackgroundImg = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "josiah-day-619224-unsplash.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid;
      return (
        <Container>
          <BgImage fluid={imageData} style={{ backgroundPosition: '' }} />
          <Content>{children}</Content>
        </Container>
      );
    }}
  />
);

export default BackgroundImg;

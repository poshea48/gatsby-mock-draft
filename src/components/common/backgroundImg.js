import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #1c1d21;
`;
const BgImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  & > img {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
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
        desktop: file(relativePath: { eq: "footballPic.png" }) {
          childImageSharp {
            fluid(maxWidth: 600, quality: 50) {
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

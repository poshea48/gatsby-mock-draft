import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  background: ${p => (p.highlight ? `#20BF55;` : `#2f4f4f`)};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamName = styled.h5`
  color: #fff;
  font-size: 10px;
  text-align: center;
  margin: 0;
`;

const Team = ({ teamName, highlight }) => {
  return (
    <Container>
      <Circle highlight={highlight}>
        <TeamName>{teamName}</TeamName>
      </Circle>
    </Container>
  );
};

export default Team;

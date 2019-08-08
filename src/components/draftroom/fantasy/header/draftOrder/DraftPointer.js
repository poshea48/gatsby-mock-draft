import React from 'react';
import styled from '@emotion/styled';
import Arrow from './Arrow';

const Container = styled.div`
  margin-top: 0.5em;
  /* flex-basis: 30%;
  padding: 0.5em 0; */
`;

const Field = styled.div``;

const DraftPointer = ({ teamIndex, direction }) => {
  return (
    <Container>
      <Arrow distance={teamIndex} direction={direction} />
    </Container>
  );
};

export default DraftPointer;

import React from 'react';
import styled from '@emotion/styled';
import Timer from './Timer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;

  @media (max-width: 650px) {
    flex-basis: 50%;
    margin-bottom: 0;
  }
`;

const Current = styled.div`
  display: flex;
  justify-content: flex-start;
  h6 {
    margin: 0 1em 0 0;
    @media (max-width: 325px) {
      margin: 0 0.5em 0 0;
    }
  }
`;

const Team = styled.div`
  p {
    margin: 0;
  }
`;

const OnTheClock = ({ teamId, round, pick, totalRounds }) => {
  return (
    <Container>
      <Timer />
      <Current>
        <h6>
          Round: {round}/{totalRounds}
        </h6>
        <h6>Pick: {pick}</h6>
      </Current>
      <Team>
        <p>On the Clock: {teamId}</p>
      </Team>
    </Container>
  );
};

export default OnTheClock;

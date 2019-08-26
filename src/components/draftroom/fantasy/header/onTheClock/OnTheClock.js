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

const Display = styled.div`
  display: flex;
  justify-content: flex-start;
  h5 {
    margin: 0 1em 0 0;
    @media (max-width: 325px) {
      margin: 0 0.5em 0 0;
    }
  }
`;

const OnTheClock = ({ team, round, pick, totalRounds }) => {
  return (
    <Container>
      <Timer />
      <Display>
        <h5>On the Clock: {(team && team.name) || ''}</h5>
      </Display>
      <Display>
        <h5>
          Round: {round}/{totalRounds}
        </h5>
        <h5>Pick: {pick}</h5>
      </Display>
    </Container>
  );
};

export default OnTheClock;

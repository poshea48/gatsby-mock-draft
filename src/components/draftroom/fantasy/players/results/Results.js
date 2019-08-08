import React, { useState } from 'react';
import styled from '@emotion/styled';
import ResultsTeamDisplay from './ResultsTeamDisplay';
import ResultsRoundDisplay from './ResultsRoundDisplay';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-left: 0.5em;
  width: 100%;

  @media (max-width: 900px) {
    width: 35%;
  }

  @media (max-width: 740px) {
    width: 25%;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5em 0;
`;

const Title = styled.h3`
  margin: 0 0.5em 0 0;

  @media (max-width: 740px) {
    margin: 0 0.3em 0 0;
    font-size: 1.2em;
  }
`;

const BySelection = styled.h5`
  cursor: pointer;
  margin: 0;

  @media (max-width: 740px) {
    font-size: 14px;
  }

  &:first-of-type {
    cursor: default;
    padding-right: 0.3em;

    @media (max-width: 740px) {
      display: none;
    }
  }

  &:last-of-type {
    margin-left: 0.3em;
    border-left: 1px solid black;
    padding-right: 0;
    padding-left: 0.3em;
  }
`;

const Results = () => {
  const [resultsType, changeType] = useState('round');

  // const [teamName, changeTeamName] = useState('You');

  const getTeam = (teamName, teams) => {
    return teams.find(team => team.id === teamName);
  };

  const handleTypeChange = type => {
    changeType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Results</Title>
        <BySelection>By</BySelection>
        <BySelection onClick={() => handleTypeChange('round')}>
          Round
        </BySelection>
        <BySelection onClick={() => handleTypeChange('team')}>Team</BySelection>
      </Header>
      {resultsType === 'team' ? (
        <ResultsTeamDisplay />
      ) : (
        <ResultsRoundDisplay />
      )}
    </Container>
  );
};

export default Results;

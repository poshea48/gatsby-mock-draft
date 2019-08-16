import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 22.8px;
  border: 1px solid #dcdcdc;
  font-size: 12px;
`;

const Round = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em;
`;

const RoundTitle = styled.div`
  span {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const PickHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #dcdcdc;
`;

const PickField = styled.span`
  flex-basis: 10%;
`;

const TeamField = styled.span`
  text-align: center;
  flex-basis: 40%;
`;

const NameField = styled.span`
  flex-basis: 50%;
`;

const ResultsWrapper = styled.div`
  height: calc(100vh - 412px);
  overflow: scroll;
`;

const RoundResults = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Pick = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3em 0;
  color: ${p => (p.you ? `#20bf55` : `black`)};
`;

const ResultsRoundDisplay = ({ results }) => {
  const resultsEndRef = useRef(null);

  const scrollToBottom = () => {
    if (!resultsEndRef.current) return;
    resultsEndRef.current.scrollTo(0, resultsEndRef.current.scrollHeight);
    // resultsEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };

  useLayoutEffect(scrollToBottom, [results]);

  const displayResults =
    results.length === 0
      ? []
      : results.map((picks, i) => {
          return (
            <Round key={`round-${i + 1}`}>
              <RoundTitle>
                <span>Round {i + 1}</span>
              </RoundTitle>

              <RoundResults>
                {picks.map((pick, j) => {
                  return (
                    <Pick key={`pick-${j}`} you={pick.teamId === 'You'}>
                      <PickField style={{ textAlign: 'center' }}>
                        {pick.pickNum}
                      </PickField>
                      <TeamField>{pick.teamName}</TeamField>
                      <NameField>
                        {pick.player.name} ({pick.player.pos})
                      </NameField>
                    </Pick>
                  );
                })}
              </RoundResults>
            </Round>
          );
        });
  return (
    <Container>
      <PickHeader>
        <PickField>Pick</PickField>
        <TeamField>Team</TeamField>
        <NameField>Player</NameField>
      </PickHeader>
      <ResultsWrapper ref={resultsEndRef}>{displayResults}</ResultsWrapper>
    </Container>
  );
};

ResultsRoundDisplay.propTypes = {
  results: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    results: state.fantasy.results,
  };
};

export default connect(
  mapStateToProps,
  {},
)(ResultsRoundDisplay);

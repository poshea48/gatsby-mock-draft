import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import DisplayNav from '../DisplayNav';
import Players from './Players';
import getTeamIndex from '../../../../../utils/getTeamIndex';
import { connect } from 'react-redux';
import { draftPlayer } from '../../../../../state/actions/fantasyActions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 600px;

  @media (max-width: 900px) {
    width: 65%;
  }

  @media (max-width: 740px) {
    width: 75%;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5em 0;
`;

const Content = styled.div``;
const availablePlayersOptions = [
  'all',
  'qb',
  'rb',
  'wr',
  'te',
  'flex',
  'dspt',
  'k',
];

const AvailablePlayers = ({ fantasy, draftPlayer }) => {
  const {
    availablePlayers,
    settings: { numOfTeams, numOfRounds },
    currentPick,
    currentRound,
    draftStarted,
    draftComplete,
  } = fantasy;

  const [position, changePosition] = useState('all');

  const handlePositionSelect = e => {
    changePosition(e.target.value);
  };

  const handlePlayerSelect = playerId => {
    if (!draftStarted || draftComplete) return;
    if (currentPick > numOfTeams * numOfRounds) return;
    const teamIndex = getTeamIndex(currentPick, currentRound, numOfTeams);
    draftPlayer(playerId, teamIndex);
  };

  const sortPlayers = (pos, players) => {
    if (pos === 'all') return players;
    return players.filter(player => {
      if (pos === 'flex') {
        return (
          player.Position === 'RB' ||
          player.Position === 'WR' ||
          player.Position === 'TE'
        );
      } else {
        return player.Position === pos.toUpperCase();
      }
    });
  };

  return (
    <Container>
      <Header>
        <DisplayNav
          title="Available Players"
          options={availablePlayersOptions}
          handleSelect={handlePositionSelect}
          selected="all"
          size="large"
        />
      </Header>
      <Content>
        <Players
          draftPlayer={handlePlayerSelect}
          players={sortPlayers(position, availablePlayers)}
        />
      </Content>
    </Container>
  );
};

AvailablePlayers.propTypes = {
  fantasy: PropTypes.object.isRequired,
  draftPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    fantasy: state.fantasy,
  };
};

export default connect(
  mapStateToProps,
  { draftPlayer },
)(AvailablePlayers);

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import DisplayNav from '../DisplayNav';
import Players from './Players';
import getTeamIndex from '../../../../../utils/getTeamIndex';
import { connect } from 'react-redux';
import { draftPlayer } from '../../../../../state/actions/fantasyActions';
import useModal from '../../../../customHooks/useModal';
import Modal from '../../../../common/Modal';

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

const Content = styled.div`
  position: relative;
`;

const PlayerWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
`;

const PlayerTitleWrapper = styled.div`
  height: 50%;
  margin: 0;
`;

const PlayerTitle = styled.h4`
  margin: 0;
  text-align: center;
  span {
    text-transform: uppercase;
  }
`;

const DraftButtonWrapper = styled.div`
  height: 50%;
  margin: 0;
`;

const DraftButton = styled.button`
  text-align: center;
  padding: 10px 1em;
  width: 100px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #6495ed;
    color: #fff;
  }
`;

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
    teams,
  } = fantasy;

  const [position, changePosition] = useState('all');
  const [currentTeamIndex, changeTeamIndex] = useState(0);
  const [open, setOpen] = useModal(false);
  const [player, setPlayer] = useState({ id: '', name: '' });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    changeTeamIndex(getTeamIndex(currentPick, currentRound, numOfTeams));
  }, [currentPick]);

  const handlePositionSelect = e => {
    changePosition(e.target.value);
  };

  const handlePlayerSelect = (x, y, player) => {
    const team = teams[currentTeamIndex];
    if (team.autoPick || !draftStarted || draftComplete) return;
    if (currentPick > numOfTeams * numOfRounds) return;
    setPlayer(player);
    setX(x);
    setY(y);
    setOpen();
  };

  const reset = () => {
    setOpen(false);
    setPlayer({ id: '', name: '' });
    setX(0);
    setY(0);
  };

  const handleDraftClick = e => {
    e.preventDefault();
    draftPlayer(player.id, currentTeamIndex);
    reset();
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
          selectPlayer={handlePlayerSelect}
          players={sortPlayers(position, availablePlayers)}
        />
        {open && (
          <Modal open={open} toggle={setOpen} x={x} y={y}>
            <PlayerWindow>
              <PlayerTitleWrapper>
                <PlayerTitle>
                  Draft <span>{player.name}</span>
                </PlayerTitle>
              </PlayerTitleWrapper>
              <DraftButtonWrapper>
                <DraftButton onClick={handleDraftClick}>Draft</DraftButton>
              </DraftButtonWrapper>
            </PlayerWindow>
          </Modal>
        )}
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

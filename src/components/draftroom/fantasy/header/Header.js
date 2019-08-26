import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import getTeamIndex from '../../../../utils/getTeamIndex';
import OnTheClock from './onTheClock/OnTheClock';
import DraftOrder from './draftOrder/DraftOrder';
import DraftPointer from './draftOrder/DraftPointer';
import styled from '@emotion/styled';
import useModal from '../../../customHooks/useModal';
import {
  incrementDraft,
  startDraft,
  pauseDraft,
  endDraft,
  draftPlayer,
  draftKeeper,
  updateKeepers,
} from '../../../../state/actions/fantasyActions';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #2f4f4f;
  justify-content: flex-start;
  flex-basis: 25%;
  padding: 0 1em;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 30%;
  margin-right: 1em;

  @media (max-width: 650px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* @media (max-width: 650px) {
    flex-basis: 70%;
  } */
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TeamName = styled.h5`
  margin: 0;
  color: #2f4f4f;
`;

const MainTitle = styled.h3`
  color: #fff;
  font-weight: 600;
  font-size: 2em;
  margin: 0.5em 0.2em 0.5em 0;

  @media (max-width: 790px) {
    font-size: 1.8em;
  }

  @media (max-width: 650px) {
    margin-bottom: 0;
  }

  @media (max-width: 400px) {
    font-size: 1.5em;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1em;
  width: 70%;
  @media (max-width: 760px) {
    width: 60%;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-bottom: 0.2em;
  }
`;

const DraftOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 100px;
`;

const Button = styled.button`
  width: 50%;
  align-self: center;
  background: #20bf55;
  padding: 0.3em 0;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  &:disabled {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: ${p => (p.open ? `block` : 'none')};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
`;

const DotDotDot = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 0.5em;
  cursor: pointer;
`;

const SettingsWindow = styled.div`
  top: ${p => p.y + 'px'};
  left: ${p => p.x + 'px'};
  position: absolute;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* width: 60px; */
  align-items: self;
  z-index: 101;
  padding: 1em 0;
`;

const SettingsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Setting = styled.li`
  font-size: 12px;
  padding: 0.5em;
  cursor: pointer;
  &:hover {
    background: #2f4f4f;
    color: #fff;
  }
`;

const SettingsLink = styled(Link)`
  color: red;
  font-weight: bold;
  text-decoration: none;
`;

const Header = props => {
  const {
    settings,
    teams,
    availablePlayers,
    teamName,
    currentPick,
    currentRound,
    draftStarted,
    draftComplete,
    keepers,
  } = props.fantasy;
  const {
    startDraft,
    pauseDraft,
    draftPlayer,
    draftKeeper,
    endDraft,
    updateKeepers,
    incrementDraft,
  } = props;

  const [currentTeam, changeTeam] = useState(null);
  const [isModalOpen, changeModal] = useModal(false);
  const [x, changeX] = useState(0);
  const [y, changeY] = useState(0);

  const simulateRef = useRef(null);

  useEffect(() => {
    if (!currentTeam) {
      changeTeam(
        teams[getTeamIndex(currentPick, currentRound, settings.numOfTeams)],
      );
    }

    if (teams.length === 0) return;
  }, []);

  // * change current team when currentPick increments
  useEffect(() => {
    changeTeam(
      teams[getTeamIndex(currentPick, currentRound, settings.numOfTeams)],
    );
  }, [currentPick]);

  useEffect(() => {
    if (!currentTeam) return;
    if (currentTeam.autoPick && draftStarted && !draftComplete) {
      simulate();
    }
  }, [currentRound]);

  // * update simulate and scroll after currentTeam updates
  useEffect(() => {
    if (!draftStarted) return;
    if (!currentTeam) return;
    if (teams.length === 0) return;
    if (currentTeam.skipRound && currentTeam.skipRound === currentRound) {
      draftKeeper(currentTeam.id);
      // incrementDraft(currentPick, currentRound, settings.numOfTeams);
      return;
    }
    if (!currentTeam.autoPick) {
      // pauseDraft();
      return;
    }
    if (currentTeam.autoPick && draftStarted && !draftComplete) {
      simulate();
      return;
    }
  }, [currentTeam]);

  useLayoutEffect(() => {
    let scroll = document.getElementById('scroll');
    scroll.scrollLeft =
      60 * getTeamIndex(currentPick, currentRound, settings.numOfTeams);
  }, [currentTeam]);

  useEffect(() => {
    // * handle drafting keeper with start of draft and 1st pick has a keeper
    if (currentTeam && currentTeam.skipRound === currentPick) {
      draftKeeper(currentTeam.id);
      return;
    }
    if (currentTeam && currentTeam.autoPick) {
      simulate();
    }
  }, [draftStarted]);

  // ! finish settings modal
  const openModal = e => {
    changeX(e.currentTarget.offsetLeft);
    changeY(e.currentTarget.offsetTop + 10);
    changeModal(true);
  };

  const closeModal = e => {
    changeModal(false);
  };

  const getDirection = () => {
    if (currentRound % 2 === 0) return 'left';
    else return 'right';
  };

  const getSimulatedPlayer = team => {
    let player;
    let position;
    for (let i = 0; i <= 5; i++) {
      position = availablePlayers[i].Position;
      if (team.bench.every(player => typeof player === 'object')) {
        let openPositions = Object.keys(team.starters).filter(pos =>
          team.starters[pos].includes('EMPTY'),
        );

        player = availablePlayers.filter(player =>
          openPositions.includes(player.Position),
        )[0];
        break;
      }
      if (
        team.starters[position] &&
        team.starters[position].includes('EMPTY') &&
        team.starters[position].filter(players => player !== 'EMPTY')[0].Bye !==
          availablePlayers[i].Bye
      ) {
        player = availablePlayers[i];
        break;
      } else if (
        (position === 'RB' || position === 'WR' || position === 'TE') &&
        team.starters.FLEX.includes('EMPTY')
      ) {
        player = availablePlayers[i];
        break;
      }
    }
    if (!player) {
      player = availablePlayers[0];
    }
    return player.id;
  };

  const simulate = () => {
    if (draftComplete || !draftStarted || !currentTeam) return;
    if (!currentTeam) return;
    if (currentPick > settings.numOfTeams * settings.numOfRounds) {
      endDraft();
      return;
    }
    if (!currentTeam.autoPick) return;

    simulateRef.current = setTimeout(() => {
      let teamIndex = teams.indexOf(currentTeam);
      let playerId = getSimulatedPlayer(currentTeam);
      draftPlayer(playerId, teamIndex);
    }, 500);
  };

  const endSimulation = () => {
    clearTimeout(simulateRef.current);
    stopSimulation();
    return;
  };

  const handleStartDraftClick = () => {
    if (keepers && !keepers.updated) {
      updateKeepers();
    }
    if (draftStarted) {
      clearTimeout(simulateRef.current);

      pauseDraft();
      return;
    }
    startDraft();
  };

  return (
    <Container>
      <LeftWrapper>
        <TitleWrapper>
          <TeamName>{teamName}</TeamName>
          <MainWrapper>
            <MainTitle>Draft Central</MainTitle>
            <DotDotDot onClick={openModal}>...</DotDotDot>
            {isModalOpen && (
              <SettingsWindow x={x} y={y}>
                <SettingsList>
                  <Setting>
                    <SettingsLink to="/fantasy/settings">Settings</SettingsLink>
                  </Setting>
                </SettingsList>
              </SettingsWindow>
            )}
          </MainWrapper>
        </TitleWrapper>
        <OnTheClock
          team={currentTeam}
          round={currentRound}
          pick={currentPick}
          totalRounds={settings.numOfRounds}
        />
      </LeftWrapper>
      <RightWrapper>
        <DraftOrderWrapper id="scroll">
          <DraftOrder teams={teams} />
          <DraftPointer
            teamIndex={getTeamIndex(
              currentPick,
              currentRound,
              settings.numOfTeams,
            )}
            direction={getDirection()}
          />
        </DraftOrderWrapper>
        <Button onClick={handleStartDraftClick} disabled={draftComplete}>
          {draftStarted ? 'Pause Draft' : 'Start Draft'}
        </Button>
      </RightWrapper>
      {isModalOpen && <Overlay onClick={closeModal} open={isModalOpen} />}
    </Container>
  );
};

Header.propTypes = {
  fantasy: PropTypes.object.isRequired,
  incrementDraft: PropTypes.func.isRequired,
  startDraft: PropTypes.func.isRequired,
  draftPlayer: PropTypes.func.isRequired,
  draftKeeper: PropTypes.func.isRequired,

  pauseDraft: PropTypes.func.isRequired,
  endDraft: PropTypes.func.isRequired,
  updateKeepers: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    fantasy: state.fantasy,
  };
};

export default connect(
  mapStateToProps,
  {
    incrementDraft,
    startDraft,
    draftPlayer,
    draftKeeper,
    pauseDraft,
    endDraft,
    updateKeepers,
  },
)(Header);

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import getTeamIndex from '../../../../utils/getTeamIndex';
import OnTheClock from './onTheClock/OnTheClock';
import DraftOrder from './draftOrder/DraftOrder';
import DraftPointer from './draftOrder/DraftPointer';
import styled from '@emotion/styled';
import {
  incrementDraft,
  startDraft,
  pauseDraft,
  endDraft,
  draftPlayer,
} from '../../../../state/actions/fantasyActions';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #2f4f4f;
  justify-content: space-between;
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
  width: 250px;
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

const TeamName = styled.h5`
  margin: 0;
  color: #2f4f4f;
`;

const MainTitle = styled.h3`
  color: #fff;
  font-weight: 600;
  font-size: 2em;
  margin: 0.5em 0;

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
  } = props.fantasy;
  const { startDraft, pauseDraft, draftPlayer, endDraft } = props;
  const simulateRef = useRef(null);

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
    if (draftComplete) return;
    if (currentPick > settings.numOfTeams * settings.numOfRounds) {
      endDraft();
      return;
    }

    if (
      !teams[getTeamIndex(currentPick, currentRound, settings.numOfTeams)]
        .autoPick
    )
      return;
    simulateRef.current = setTimeout(async () => {
      let teamIndex = getTeamIndex(
        currentPick,
        currentRound,
        settings.numOfTeams,
      );
      let playerId = getSimulatedPlayer(teams[teamIndex]);
      await draftPlayer(playerId, teamIndex);
      // incrementDraft(currentPick, currentRound, settings.numOfTeams);
    }, 500);
  };

  const endSimulation = () => {
    clearTimeout(simulateRef.current);
    stopSimulation();
    return;
  };

  useEffect(() => {
    if (
      teams[getTeamIndex(currentPick, currentRound, settings.numOfTeams)]
        .autoPick &&
      draftStarted
    ) {
      console.log('useEffect before simulate');
      simulate();
    }
    let scroll = document.getElementById('scroll');
    scroll.scrollLeft =
      60 * getTeamIndex(currentPick, currentRound, settings.numOfTeams);
  }, [currentPick]);

  useEffect(() => {
    if (draftStarted) {
      simulate();
    }
  }, [draftStarted]);

  const handleStartDraftClick = () => {
    if (draftStarted) {
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
          <MainTitle>Draft Central</MainTitle>
        </TitleWrapper>
        <OnTheClock
          team={
            teams &&
            teams[getTeamIndex(currentPick, currentRound, settings.numOfTeams)]
              .id
          }
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
    </Container>
  );
};

Header.propTypes = {
  fantasy: PropTypes.object.isRequired,
  incrementDraft: PropTypes.func.isRequired,
  startDraft: PropTypes.func.isRequired,
  draftPlayer: PropTypes.func.isRequired,
  pauseDraft: PropTypes.func.isRequired,
  endDraft: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    fantasy: state.fantasy,
  };
};

export default connect(
  mapStateToProps,
  { incrementDraft, startDraft, draftPlayer, pauseDraft, endDraft },
)(Header);

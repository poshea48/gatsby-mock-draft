import {
  SETUP_FANTASY_DRAFTROOM,
  INCREMENT_DRAFT,
  START_DRAFT,
  PAUSE_DRAFT,
  GET_ALL_PLAYERS,
  DRAFT_PLAYER,
  DRAFT_KEEPER,
  END_DRAFT,
  UPDATE_TEAM_NAME,
  TOGGLE_AUTOPICK,
  UPDATE_KEEPER,
  UPDATE_KEEPER_ROUND,
  UPDATE_KEEPERS,
} from '../types';

const getPositionArray = num => {
  return Array.from({ length: num }, () => 'EMPTY');
};

const getBenchNumber = (positions, numOfRounds) => {
  let bench =
    Number(numOfRounds) -
    Object.values(positions).reduce((acc, num) => acc + num, 0);
  return bench;
};

const generateTeams = (numOfTeams, pick, numOfRounds, positions) => {
  let teams = [];
  for (let i = 1; i <= numOfTeams; i++) {
    // get each team unique id/teamName
    let team = { id: '', starters: {}, bench: [], autoPick: true };
    if (i === pick) {
      team.id = i;
      team.name = 'You';
      team.autoPick = false;
    } else {
      team.id = i;
      team.name = `Sim-${i}`;
    }
    team.pick = i;

    // get array of empty slots for each starting position
    Object.keys(positions).forEach(pos => {
      if (positions[pos] > 0) {
        team.starters[pos] = getPositionArray(positions[pos]);
      }
    });

    // get array of empty slots for each bench player
    team.bench = getPositionArray(getBenchNumber(positions, numOfRounds));
    teams.push(team);
  }
  return teams;
};

// numOfTeams vs numOfRounds
export const setupFantasyDraftroom = ({
  teamName,
  numOfTeams,
  pickNum,
  keeper,
  numOfRounds,
  QB,
  RB,
  WR,
  FLEX,
  TE,
  DSPT,
  K,
}) => dispatch => {
  let settings = {
    numOfTeams: Number(numOfTeams),
    numOfRounds: Number(numOfRounds),
    pickNum: Number(pickNum),
    keeper,
  };
  let positions = {
    QB: Number(QB),
    RB: Number(RB),
    WR: Number(WR),
    FLEX: Number(FLEX),
    TE: Number(TE),
    DSPT: Number(DSPT),
    K: Number(K),
  };

  let teams = generateTeams(
    Number(numOfTeams),
    Number(pickNum),
    Number(numOfRounds),
    positions,
  );
  let keepers = keeper
    ? teams.reduce((keeps, team) => {
        keeps[team.id] = {
          playerId: '',
          playerName: '',
          round: '',
          updated: false,
        };
        return keeps;
      }, {})
    : null;
  return dispatch({
    type: SETUP_FANTASY_DRAFTROOM,
    payload: {
      teamName,
      settings,
      teams,
      keepers,
    },
  });
};

export const incrementDraft = (
  currentPick,
  currentRound,
  numOfTeams,
) => dispatch => {
  const incrementRound = currentPick % numOfTeams === 0;
  return dispatch({
    type: INCREMENT_DRAFT,
    payload: {
      currentPick: currentPick + 1,
      currentRound: incrementRound ? currentRound + 1 : currentRound,
    },
  });
};

export const startDraft = () => dispatch => {
  return dispatch({
    type: START_DRAFT,
  });
};

export const pauseDraft = () => dispatch => {
  return dispatch({
    type: PAUSE_DRAFT,
  });
};

export const endDraft = () => dispatch => {
  return dispatch({
    type: END_DRAFT,
  });
};

export const getAllPlayers = playerIndex => (dispatch, getState) => {
  const { availablePlayers } = getState().fantasy;
  if (availablePlayers.length > 0) return;

  return dispatch({
    type: GET_ALL_PLAYERS,
    payload: playerIndex,
  });
};

export const draftPlayer = (playerId, teamIndex) => dispatch => {
  return dispatch({
    type: DRAFT_PLAYER,
    payload: {
      playerId,
      teamIndex,
    },
  });
};

export const draftKeeper = teamId => dispatch => {
  return dispatch({
    type: DRAFT_KEEPER,
    payload: {
      teamId,
    },
  });
};

export const updateTeamName = (teamId, teamName) => dispatch => {
  console.log(teamId);
  return dispatch({
    type: UPDATE_TEAM_NAME,
    payload: {
      teamId,
      teamName,
    },
  });
};

export const toggleAutoPick = teamId => dispatch => {
  return dispatch({
    type: TOGGLE_AUTOPICK,
    payload: {
      teamId,
    },
  });
};

export const updateKeeper = (
  playerId,
  playerName,
  playerPosition,
  teamId,
) => dispatch => {
  console.log('action => updateKeeper');
  return dispatch({
    type: UPDATE_KEEPER,
    payload: {
      playerId,
      playerName,
      playerPosition,
      teamId,
    },
  });
};

export const updateKeeperRound = (round, teamId) => dispatch => {
  return dispatch({
    type: UPDATE_KEEPER_ROUND,
    payload: {
      round: Number(round),
      teamId,
    },
  });
};

export const updateKeepers = () => dispatch => {
  return dispatch({
    type: UPDATE_KEEPERS,
  });
};

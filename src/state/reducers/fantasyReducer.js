import {
  SETUP_FANTASY_DRAFTROOM,
  INCREMENT_DRAFT,
  START_DRAFT,
  PAUSE_DRAFT,
  GET_ALL_PLAYERS,
  DRAFT_PLAYER,
  END_DRAFT,
} from '../types';

const initialState = {
  teamName: '',
  settings: {},
  teams: [],
  currentRound: 1,
  currentPick: 1,
  draftStarted: false,
  availablePlayers: [],
  results: [],
  draftComplete: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SETUP_FANTASY_DRAFTROOM:
      return { ...state, ...payload };
    case INCREMENT_DRAFT:
      return { ...state, ...payload };
    case START_DRAFT:
      return { ...state, draftStarted: true };
    case PAUSE_DRAFT:
      return { ...state, draftStarted: false };
    case END_DRAFT:
      return { ...state, draftComplete: true };
    case GET_ALL_PLAYERS:
      return { ...state, availablePlayers: payload };
    // accepts team and player, make copy of each and remove player from copied players and add to copied team
    case DRAFT_PLAYER:
      let drafted;
      let index;
      let nextPick;
      let nextRound;
      let finished;
      const newPlayers = state.availablePlayers.filter(player => {
        if (player.id === payload.playerId) {
          drafted = player;
          return false;
        } else return true;
      });
      const teams = [...state.teams];
      const team = teams[payload.teamIndex];
      const starters = team.starters;
      const position = drafted.Position;
      const newResults = [...state.results];
      const pickObject = {
        player: {
          name: drafted.Player,
          pos: drafted.Position,
        },
        teamId: team.id,
        pickNum: state.currentPick,
      };
      newResults[state.currentRound - 1]
        ? newResults[state.currentRound - 1].push(pickObject)
        : (newResults[state.currentRound - 1] = [pickObject]);

      if (starters[position] && starters[position].includes('EMPTY')) {
        index = starters[position].indexOf('EMPTY');
        starters[position][index] = drafted;
      } else if (
        (position === 'RB' || position === 'WR' || position === 'TE') &&
        starters.FLEX &&
        starters.FLEX.includes('EMPTY')
      ) {
        index = starters.FLEX.indexOf('EMPTY');
        starters.FLEX[index] = drafted;
      } else {
        index = team.bench.indexOf('EMPTY');
        team.bench[index] = drafted;
      }

      if (
        state.currentPick ===
        state.settings.numOfTeams * state.settings.numOfRounds
      ) {
        nextPick = state.currentPick;
        nextRound = state.currentRound;
        finished = true;
      } else {
        finished = false;
        nextPick = state.currentPick + 1;
        nextRound =
          state.currentPick % state.settings.numOfTeams === 0
            ? state.currentRound + 1
            : state.currentRound;
      }

      return {
        ...state,
        availablePlayers: newPlayers,
        teams,
        results: newResults,
        currentPick: nextPick,
        currentRound: nextRound,
        draftStarted: !finished,
        draftComplete: finished,
      };
    default:
      return state;
  }
};

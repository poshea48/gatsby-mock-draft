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
import getPickNum from '../../utils/getPickNum';

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
  let updateTeams;
  let updateTeam;
  let starters;
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
      updateTeams = [...state.teams];
      updateTeam = updateTeams[payload.teamIndex];
      starters = updateTeam.starters;
      const position = drafted.Position;
      const newResults = [...state.results];
      let pickObject = {
        player: {
          name: drafted.Player,
          pos: drafted.Position,
        },
        // teamId: updateTeam.id, ** change to use team.name
        teamName: updateTeam.name,
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
        index = updateTeam.bench.indexOf('EMPTY');
        updateTeam.bench[index] = drafted;
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
        teams: updateTeams,
        results: newResults,
        currentPick: nextPick,
        currentRound: nextRound,
        draftStarted: !finished,
        draftComplete: finished,
      };
    case DRAFT_KEEPER:
      const resultsCopy = [...state.results];
      drafted = state.keepers[payload.teamId];
      updateTeam = state.teams.find(team => team.id === payload.teamId);
      pickObject = {
        player: {
          name: drafted.playerName,
          pos: drafted.playerPosition,
        },
        // teamId: updateTeam.id, ** change to use team.name
        teamName: updateTeam.name,
        pickNum: state.currentPick,
      };
      resultsCopy[state.currentRound - 1]
        ? resultsCopy[state.currentRound - 1].push(pickObject)
        : (resultsCopy[state.currentRound - 1] = [pickObject]);
      nextPick = state.currentPick + 1;
      nextRound =
        state.currentPick % state.settings.numOfTeams === 0
          ? state.currentRound + 1
          : state.currentRound;
      return {
        ...state,
        results: resultsCopy,
        currentPick: nextPick,
        currentRound: nextRound,
      };
    case UPDATE_TEAM_NAME:
      const { teamId, teamName } = action.payload;
      updateTeams = [...state.teams];
      updateTeam = updateTeams.find(team => team.id === Number(teamId));
      updateTeam.name = teamName;
      return {
        ...state,
        teams: updateTeams,
      };
    case TOGGLE_AUTOPICK:
      updateTeams = [...state.teams];
      updateTeam = updateTeams.find(team => team.id === payload.teamId);
      updateTeam.autoPick = !updateTeam.autoPick;
      return {
        ...state,
        teams: updateTeams,
      };
    case UPDATE_KEEPER:
      let keepersCopy = { ...state.keepers };
      keepersCopy[payload.teamId] = { ...payload };
      console.log('reducer => updateKeeper');
      return {
        ...state,
        keepers: keepersCopy,
      };
    case UPDATE_KEEPER_ROUND:
      keepersCopy = { ...state.keepers };
      keepersCopy[payload.teamId].round = payload.round;
      return {
        ...state,
        keepers: keepersCopy,
      };
    case UPDATE_KEEPERS:
      let playerId;
      let player;
      let keepers = { ...state.keepers };
      let keeper;
      const updatedAvailablePlayers = [...state.availablePlayers];
      const updatedTeams = [...state.teams];
      const results = [...results];
      let resultsObject;
      let updatedStatus = false;
      updatedTeams.forEach((team, i) => {
        keeper = keepers[team.id]; // get keeper object for team
        if (!keeper.playerId) return; // if there is no keeper return
        if (keeper.updated) return;
        playerId = keeper.playerId; // get playerId from keeper objec
        player = updatedAvailablePlayers.find(p => p.id === playerId); // get player from avilablePlayers copy
        team.starters[player.Position][0] = player; // add player into starters
        team.skipRound = keeper.round; // add a skipRound property so simulate will skip
        updatedAvailablePlayers.splice(
          updatedAvailablePlayers.indexOf(player), // remove player from updatedPlayers
          1,
        );

        keeper.updated = true;
      });
      return {
        ...state,
        teams: updatedTeams,
        availablePlayers: updatedAvailablePlayers,
        keepers: { ...state.keepers, updated: updatedStatus },
      };
    default:
      return state;
  }
};

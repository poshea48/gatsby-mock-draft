import { SETUP_FANTASY_DRAFTROOM } from '../types';

const initialState = {
  teamName: '',
  numOfTeams: null,
  numOfRounds: null,
  positions: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SETUP_FANTASY_DRAFTROOM:
      return { ...state, ...payload };
    default:
      return state;
  }
};

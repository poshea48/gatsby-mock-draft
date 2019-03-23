import { SETUP_NFL_DRAFTROOM } from '../types';

const initialState = {
  type: '',
  team: '',
  draftBoard: 'default',
  teamNeeds: 'default',
  playersDrafted: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SETUP_NFL_DRAFTROOM:
      return { ...state, ...payload };
    default:
      return state;
  }
};

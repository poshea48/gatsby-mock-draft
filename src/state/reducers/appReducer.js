import { TOGGLE_DRAWER, TOGGLE_PLAYERS_MODAL } from '../types';

const initialState = {
  isDrawerOpen: false,
  isPlayersModalOpen: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: payload };
    case TOGGLE_PLAYERS_MODAL:
      return { ...state, isPlayersModalOpen: payload };
    default:
      return state;
  }
};

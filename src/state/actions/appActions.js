import { TOGGLE_DRAWER, TOGGLE_PLAYERS_MODAL } from '../types';
export const toggleDrawer = open => ({ type: TOGGLE_DRAWER, payload: open });

// export const togglePlayersModal = open => ({
//   type: TOGGLE_PLAYERS_MODAL,
//   payload: open,
// });

export const togglePlayersModal = open => dispatch => {
  console.log('landed here');
  dispatch({
    type: TOGGLE_PLAYERS_MODAL,
    payload: open,
  });
};

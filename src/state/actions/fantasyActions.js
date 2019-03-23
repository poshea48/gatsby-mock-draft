import { SETUP_FANTASY_DRAFTROOM } from '../types';

export const setupFantasyDraftroom = setupInfo => dispatch => {
  dispatch({
    type: SETUP_FANTASY_DRAFTROOM,
    payload: setupInfo,
  });
};

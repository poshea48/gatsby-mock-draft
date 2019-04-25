import { SETUP_NFL_DRAFTROOM } from '../types';
import { navigate } from 'gatsby';

export const setupNflDraftroom = setupInfo => dispatch => {
  localStorage.setItem('nflSetupStore', JSON.stringify(setupInfo));
  return dispatch({
    type: SETUP_NFL_DRAFTROOM,
    payload: setupInfo,
  });
};

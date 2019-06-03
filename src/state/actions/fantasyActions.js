import { SETUP_FANTASY_DRAFTROOM } from '../types';

export const setupFantasyDraftRoom = setupInfo => ({
  type: SETUP_FANTASY_DRAFTROOM,
  payload: setupInfo,
});

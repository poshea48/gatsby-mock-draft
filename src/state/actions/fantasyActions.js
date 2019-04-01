import { SETUP_FANTASY_DRAFTROOM } from '../types';

export const setupNflDraftroom = setupInfo => ({
  type: SETUP_FANTASY_DRAFTROOM,
  payload: setupInfo,
});

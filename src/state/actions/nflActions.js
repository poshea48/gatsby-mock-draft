import { SETUP_NFL_DRAFTROOM } from '../types';

export const setupNflDraftroom = setupInfo => ({
  type: SETUP_NFL_DRAFTROOM,
  payload: setupInfo,
});

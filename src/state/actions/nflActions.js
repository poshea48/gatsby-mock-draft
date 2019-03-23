import { SETUP_NFL_DRAFTROOM } from '../types';
import { navigate } from 'gatsby';

export const setupNflDraftroom = setupInfo => ({
  type: SETUP_NFL_DRAFTROOM,
  payload: setupInfo,
});

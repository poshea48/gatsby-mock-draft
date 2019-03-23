import { combineReducers } from 'redux';
import appReducer from './appReducer';
import nflReducer from './nflReducer';
import fantasyReducer from './fantasyReducer';

export default combineReducers({
  app: appReducer,
  nfl: nflReducer,
  fantasy: fantasyReducer,
});

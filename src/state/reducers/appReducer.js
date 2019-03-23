import { TOGGLE_DRAWER } from '../types';

const initialState = {
  isDrawerOpen: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: payload };
    default:
      return state;
  }
};

import { SET_LOCATION } from '../constants/navigationActions';

export const navigationReducer = (state, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

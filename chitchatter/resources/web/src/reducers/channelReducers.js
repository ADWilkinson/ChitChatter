import { SET_CHANNEL } from '../constants/channelActions';

export const channelReducer = (state, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return { ...state, channel: action.payload };
    default:
      return state;
  }
};

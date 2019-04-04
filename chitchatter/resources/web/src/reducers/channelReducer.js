import { SET_CHANNEL, SET_CHANNEL_SOCKET, REMOVE_CHANNEL_SOCKET } from "../constants/channelActions";

export const channelReducer = (state, action) => {
  console.warn('state', state)
  console.warn('action', action)
  switch (action.type) {
    case SET_CHANNEL:
      return { ...state, channel: action.payload.name, channelIndex: action.payload.index };
    default:
      return state;
  }
};

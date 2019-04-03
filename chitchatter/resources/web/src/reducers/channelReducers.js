import { SET_CHANNEL, SET_CHANNEL_SOCKET, REMOVE_CHANNEL_SOCKET } from '../constants/channelActions';

export const channelReducer = (state, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return { ...state, channel: action.payload.name, channelIndex: action.payload.index };
    case SET_CHANNEL_SOCKET:
      return {...state, socketInfo: {...state.socketInfo, currentSocket: action.payload.socket} }
    case REMOVE_CHANNEL_SOCKET:
      return {...state, socketInfo: {...state.socketInfo, currentSocket: action.payload.socket} }
    default:
      return state;
  }
};

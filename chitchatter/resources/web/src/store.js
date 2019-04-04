import React, { useReducer } from 'react';
import { channelReducer } from './reducers/channelReducers';
import { usersReducer } from './reducers/usersReducer';
import { CHANNEL_GLOBAL, CHANNEL_LIST } from './constants/channels';
import { messagesReducer } from './reducers/messagesReducer';
import { connect } from './utils/socket';

export const Store = React.createContext();

const initialState = {
  channel: CHANNEL_GLOBAL,
  channelIndex: 0,
  users: [],
  messages: []
};

const mainReducer = (state, action) => {
  /*
    Middleware goes here.
   */

  return {
    channel: channelReducer(state, action),
    users: usersReducer(state, action),
    messages: messagesReducer(state, action)
  };
};

export const StoreProvider = props => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const sockets = connect(dispatch, CHANNEL_LIST);
  const value = { state, dispatch, sockets };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

import React, { useReducer } from 'react';
import { channelReducer } from './reducers/channelReducers';
import { usersReducer } from './reducers/usersReducer';
import { CHANNEL_GLOBAL } from './constants/channels';
import { messagesReducer } from './reducers/messagesReducer';

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
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

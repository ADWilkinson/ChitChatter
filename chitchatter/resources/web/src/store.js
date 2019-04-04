import React, { useReducer } from "react";
import { channelReducer } from "./reducers/channelReducer";
import { usersReducer } from "./reducers/usersReducer";
import { CHANNEL_GLOBAL } from "./constants/channels";
import { messagesReducer } from "./reducers/messagesReducer";
import { isEqual } from "lodash";

export const Store = React.createContext();

const initialState = {
  channel: CHANNEL_GLOBAL,
  channelIndex: 0,
  users: [],
  messages: {
    global: [],
    uk: []
  }
};

const mainReducer = (state, action) => {
  /*
    Middleware goes here.
   */
  let reducers = [channelReducer, usersReducer, messagesReducer];

  for (let reducer of reducers) {
    let newState = reducer(state, action);
    if (!isEqual(newState, state)) return newState;
  }
};

export const StoreProvider = props => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

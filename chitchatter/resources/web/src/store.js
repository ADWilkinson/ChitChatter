import React, { useReducer } from 'react';
import { navigationReducer } from './reducers/navigationReducer';
import { usersReducer } from './reducers/usersReducer';

export const Store = React.createContext();

const initialState = {
  location: '',
  users: []
};

const mainReducer = (state, action) => {
  /*
    Middleware goes here.
   */

  return {
    location: navigationReducer(state, action),
    users: usersReducer(state, action)
  };
};

export const StoreProvider = props => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

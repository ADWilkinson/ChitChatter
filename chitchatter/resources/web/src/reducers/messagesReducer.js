import { SET_GLOBAL_MESSAGES, SET_UK_MESSAGES, ADD_GLOBAL_MESSAGE, ADD_UK_HISTORY } from "../constants/messagesActions";

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case SET_GLOBAL_MESSAGES:
      return { ...state, messages: { ...state.messages, global: action.payload } };
    case SET_UK_MESSAGES:
      return { ...state, messages: { ...state.messages, uk: action.payload } };
    case ADD_GLOBAL_MESSAGE:
      return { ...state, messages: { ...state.messages, global: { ...state.messages.global, ...action.payload } } };
    case ADD_UK_HISTORY:
      return { ...state, messages: { ...state.messages, global: { ...state.messages.uk, ...action.payload } } };
    default:
      return state;
  }
};

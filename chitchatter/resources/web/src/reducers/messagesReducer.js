import { SET_MESSAGES_LIST } from '../constants/messagesActions';
import { ADD_MESSAGE_TO_LIST } from '../constants/messagesActions';

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case SET_MESSAGES_LIST:
      return { ...state, messages: action.payload };
    case ADD_MESSAGE_TO_LIST:
      return { ...state.messages, messages: Object.create({}, ...state.messages, action.payload)};
    default:
      return state;
  }
};

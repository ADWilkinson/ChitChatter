import { SET_MESSAGE_HISTORY, ADD_GLOBAL_MESSAGE, ADD_UK_MESSAGE } from '../constants/messagesActions';

export const messagesReducer = (state, action) => {
  let globalMessages;
  let ukMessages;

  switch (action.type) {
    case SET_MESSAGE_HISTORY:
      globalMessages = [...action.payload.global];
      ukMessages = [...action.payload.uk];
      const messagesObj = { global: globalMessages, uk: ukMessages };
      return { ...state, messages: messagesObj };

    case ADD_GLOBAL_MESSAGE:
      console.log('EXCUTING REDUCER', state, action);
      let globalArr = [...state.messages.global];
      globalArr.push(action.payload);
      return { ...state, messages: { ...state.messages, global: globalArr } };
    case ADD_UK_MESSAGE:
      console.log('EXCUTING REDUCER', state, action);
      let ukArr = [...state.messages.uk];
      ukArr.push(action.payload);
      return { ...state, messages: { ...state.messages, uk: ukArr } };
    default:
      return state;
  }
};

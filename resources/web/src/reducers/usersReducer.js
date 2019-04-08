import { SET_USERS_LIST, SET_USER_ID } from '../constants/usersActions';

export const usersReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return { ...state, users: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

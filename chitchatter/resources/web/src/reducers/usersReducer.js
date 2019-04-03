import { SET_USERS_LIST } from '../constants/usersActions';

export const usersReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return { ...state.users, users: action.payload };
    default:
      return state;
  }
};

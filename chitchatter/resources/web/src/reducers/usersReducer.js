import { GET_USERS_LIST } from '../constants/usersActions';

export const usersReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

import produce from 'immer';
import { LOGIN, LOGOUT } from '../constants/authConstants';

const initialState = {
  loggedIn: false,
  user: null,
};
/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action = {}) => produce(state, (draft) => {
  switch (action.type) {
    case LOGIN:
      draft.loggedIn = true;
      draft.user = action.payload;
      break;
    case LOGOUT:
      draft.loggedIn = false;
      draft.user = null;
      break;
    default:
      break;
  }
});

export default authReducer;

import produce from 'immer';
import { LOGIN, LOGOUT } from '../constants/authConstants';
import { CLOSE_NOTIF, GET_ERROR_NOTIF } from '../constants/notifConstants';

const initialState = {
  loggedIn: false,
  user: null,
  notifMsg: '',
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
    case GET_ERROR_NOTIF:
      draft.notifMsg = action.payload;
      break;
    case CLOSE_NOTIF:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default authReducer;

import produce from 'immer';
import { INIT } from '../constants/reduxFormConstants';

const initialState = {
  usersLogin: {
    email: '',
    password: '',
    remember: false
  }
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft.userLogin = state;
      break;
    default:
      break;
  }
});

export default loginReducer;

import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF, GET_ERROR_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_TODO_LIST,
  FETCH_TODO_DATA,
  ADD_TODO_DATA,
  UPDATE_TODO_DATA
} from './todosConstants';

const initialState = {
  todoList: [],
  todoData: null,
  keywordValue: '',
  notifMsg: '',
};

/* eslint-disable default-case, no-param-reassign */
const todosReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_TODO_LIST:
      draft.todoList = action.items;
      break;
    case FETCH_TODO_DATA:
      draft.todoData = action.items;
      break;
    case ADD_TODO_DATA:
      draft.notifMsg = notif.addTodoData;
      break;
    case UPDATE_TODO_DATA:
      draft.notifMsg = notif.updateTodoData;
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

export default todosReducer;

import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_BOARD_DATA,
  ADD_BOARD,
  DISCARD_BOARD,
  DELETE_BOARD,
  SUBMIT_BOARD
} from './taskboardConstants';

const initialState = {
  boardData: { lanes: [] },
  openFrm: false,
  formValues: null,
  notifMsg: '',
};

const initForm = {
  title: '',
  label: '',
  color: '#EC407A',
  cards: []
};

const buildLanes = (board) => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  return {
    id,
    title: board.title,
    label: board.label,
    color: board.color,
    cards: [],
  };
};

/* eslint-disable default-case, no-param-reassign */
const taskboardReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_BOARD_DATA:
      draft.boardData = action.items;
      break;
    case ADD_BOARD:
      draft.openFrm = true;
      draft.formValues = initForm;
      break;
    case DISCARD_BOARD:
      draft.openFrm = false;
      draft.formValues = null;
      draft.notifMsg = notif.discard;
      break;
    case SUBMIT_BOARD: {
      const newLanes = buildLanes(action.newBoard);
      draft.boardData.lanes.push(newLanes);
      draft.formValues = null;
      draft.openFrm = false;
      draft.notifMsg = notif.saved;
      break;
    }
    case DELETE_BOARD: {
      const index = draft.boardData.lanes.findIndex((obj) => obj.id === action.boardId);
      if (index !== -1) {
        draft.boardData.lanes.splice(index, 1);
        draft.notifMsg = notif.removed;
      }
      break;
    }
    case CLOSE_NOTIF:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default taskboardReducer;

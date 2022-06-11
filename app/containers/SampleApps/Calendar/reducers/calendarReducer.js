import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_CALENDAR_DATA,
  ADD_EVENT,
  DISCARD_EVENT,
  SUBMIT_EVENT,
  DELETE_EVENT
} from './calendarConstants';

const initialState = {
  events: [],
  openFrm: false,
  formValues: null,
  notifMsg: ''
};

const initForm = {
  title: '',
  start: new Date(),
  end: new Date(),
  hexColor: 'EC407A',
};

/* eslint-disable default-case, no-param-reassign */
const calendarReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_CALENDAR_DATA:
      draft.events = action.items;
      break;
    case ADD_EVENT:
      draft.openFrm = true;
      draft.formValues = initForm;
      break;
    case DISCARD_EVENT:
      draft.openFrm = false;
      draft.formValues = null;
      draft.notifMsg = notif.discard;
      break;
    case SUBMIT_EVENT: {
      const newItem = {
        ...action.newEvent,
        id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
        start: action.newEvent.start._d || action.newEvent.start,
        end: action.newEvent.end._d || action.newEvent.end,
      };
      draft.events.push(newItem);
      draft.formValues = null;
      draft.openFrm = false;
      draft.notifMsg = notif.saved;
      break;
    }
    case DELETE_EVENT: {
      const index = draft.events.findIndex((obj) => obj.id === action.event.id);
      if (index !== -1) {
        draft.events.splice(index, 1);
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

export default calendarReducer;

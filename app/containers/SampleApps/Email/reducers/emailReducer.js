import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import dummyData from 'dan-api/dummy/dummyContents';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_EMAIL_DATA,
  OPEN_MAIL,
  FILTER_MAIL,
  COMPOSE_MAIL,
  SEND_MAIL,
  DISCARD_MESSAGE,
  SEARCH_MAIL,
  DELETE_MAIL,
  MOVE_TO,
  TOGGLE_STARED
} from './emailConstants';
import { getDate, getTime } from '../../../helpers/dateTimeHelper';

const initialState = {
  inbox: [],
  selectedMail: 0,
  selectedMailId: '',
  keywordValue: '',
  currentPage: 'inbox',
  openFrm: false,
  notifMsg: '',
};

const buildMessage = (to, subject, content, files) => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  return {
    id,
    date: getDate(),
    time: getTime(),
    avatar: dummyData.user.avatar,
    name: to,
    subject,
    content,
    attachment: files,
    category: 'sent',
    stared: false,
  };
};

/* eslint-disable default-case, no-param-reassign */
const emailReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_EMAIL_DATA:
      draft.inbox = action.items;
      break;
    case OPEN_MAIL: {
      const index = draft.inbox.findIndex((obj) => obj.id === action.mail.id);
      if (index !== -1) {
        draft.selectedMail = index;
      }
      break;
    }
    case FILTER_MAIL:
      draft.currentPage = action.filter;
      break;
    case COMPOSE_MAIL:
      draft.openFrm = true;
      break;
    case SEND_MAIL: {
      const newMail = buildMessage(action.to, action.subject, action.content, action.attachment);
      draft.inbox.unshift(newMail);
      draft.selectedMail = '';
      draft.openFrm = false;
      draft.notifMsg = notif.sent;
      break;
    }
    case DISCARD_MESSAGE:
      draft.openFrm = false;
      draft.selectedMailId = '';
      draft.notifMsg = notif.discard;
      break;
    case SEARCH_MAIL: {
      action.keyword.persist();
      const keyword = action.keyword.target.value.toLowerCase();
      draft.keywordValue = keyword;
      break;
    }
    case DELETE_MAIL: {
      const index = draft.inbox.findIndex((obj) => obj.id === action.mail.id);
      if (index !== -1) {
        draft.inbox.splice(index, 1);
        draft.notifMsg = notif.removed;
      }
      break;
    }
    case TOGGLE_STARED: {
      const index = draft.inbox.findIndex((obj) => obj.id === action.mail.id);
      if (index !== -1) {
        draft.inbox[index].stared = !draft.inbox[index].stared;
      }
      break;
    }
    case MOVE_TO: {
      const index = draft.inbox.findIndex((obj) => obj.id === action.mail.id);
      draft.inbox[index].category = action.category;
      draft.notifMsg = notif.labeled;
      break;
    }
    case CLOSE_NOTIF:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default emailReducer;

import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import dummyData from 'dan-api/dummy/dummyContents';
import { CLOSE_NOTIF, GET_ERROR_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_GOALS_DATA,
  OPEN_GOAL,
  FILTER_GOALS,
  COMPOSE_GOAL,
  SEND_GOAL,
  DISCARD_MESSAGE,
  SEARCH_GOAL,
  DELETE_GOAL,
  MOVE_TO,
  TOGGLE_STARED,
  SET_TAB
} from './goalsConstants';
import { getDate, getTime } from '../../helpers/dateTimeHelper';

const initialState = {
  goal1List: [],
  goal2List: [],
  goal3List: [],
  summaryReport: [],
  selectedGoal: 0,
  selectedGoalId: '',
  keywordValue: '',
  openFrm: false,
  notifMsg: '',
  activeTab: 0,
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
    case FETCH_GOALS_DATA:
      draft.inbox = action.items;
      break;
    case OPEN_GOAL: {
      const index = draft.inbox.findIndex((obj) => obj.id === action.mail.id);
      if (index !== -1) {
        draft.selectedMail = index;
      }
      break;
    }
    case FILTER_GOALS:
      draft.currentPage = action.filter;
      break;
    case COMPOSE_GOAL:
      draft.openFrm = true;
      break;
    case SET_TAB:
      draft.activeTab = action.payload;
      break;
    case SEND_GOAL: {
      draft.selectedMail = '';
      draft.openFrm = false;
      draft.notifMsg = 'Announcement Sent!';
      break;
    }
    case DISCARD_MESSAGE:
      draft.openFrm = false;
      draft.selectedMailId = '';
      draft.notifMsg = notif.discard;
      break;
    case SEARCH_GOAL: {
      action.keyword.persist();
      const keyword = action.keyword.target.value.toLowerCase();
      draft.keywordValue = keyword;
      break;
    }
    case DELETE_GOAL:
      draft.notifMsg = 'Announcement Removed';
      break;
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

export default emailReducer;

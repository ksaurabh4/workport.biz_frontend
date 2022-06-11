import produce from 'immer';
import {
  FETCH_CHAT_DATA,
  SHOW_CHAT,
  HIDE_CHAT,
  SEND_CHAT,
  DELETE_CONVERSATION
} from './chatConstants';
import { getDate, getTime } from '../../../helpers/dateTimeHelper';

const initialState = {
  chatList: [],
  activeChat: [],
  chatSelected: 0,
  showMobileDetail: false
};

const buildMessage = message => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const newData = {
    id,
    from: 'me',
    date: getDate(),
    time: getTime(),
    message,
  };
  return newData;
};

/* eslint-disable default-case, no-param-reassign */
const chatdReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_CHAT_DATA:
      draft.chatList = action.items;
      draft.activeChat = action.items[draft.chatSelected].chat;
      break;
    case SHOW_CHAT: {
      const index = draft.chatList.findIndex((obj) => obj.with === action.person.id);
      if (index !== -1) {
        draft.chatSelected = index;
        draft.activeChat = draft.chatList[index].chat;
        draft.showMobileDetail = true;
      }
      break;
    }
    case HIDE_CHAT:
      draft.showMobileDetail = false;
      break;
    case SEND_CHAT: {
      const newMessage = buildMessage(action.message);
      draft.chatList[draft.chatSelected].chat.push(newMessage);
      draft.activeChat = draft.chatList[draft.chatSelected].chat;
      break;
    }
    case DELETE_CONVERSATION:
      draft.chatList[draft.chatSelected].chat = [];
      draft.activeChat = [];
      break;
    default:
      break;
  }
});

export default chatdReducer;

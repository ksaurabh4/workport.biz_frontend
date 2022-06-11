import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_CONTACT_DATA,
  SEARCH_CONTACT,
  SHOW_DETAIL_CONTACT,
  HIDE_DETAIL,
  EDIT_CONTACT,
  SUBMIT_CONTACT,
  DELETE_CONTACT,
  TOGGLE_FAVORITE,
  ADD_CONTACT,
  CLOSE_CONTACT_FORM
} from './contactConstants';

const initialState = {
  contactList: [],
  formValues: null,
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  showMobileDetail: false,
  notifMsg: '',
};
let editingIndex = 0;

/* eslint-disable default-case, no-param-reassign */
const contactReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_CONTACT_DATA:
      draft.contactList = action.items;
      break;
    case SEARCH_CONTACT: {
      action.keyword.persist();
      const keyword = action.keyword.target.value.toLowerCase();
      draft.keywordValue = keyword;
      break;
    }
    case ADD_CONTACT:
      draft.openFrm = true;
      draft.formValues = {};
      draft.avatarInit = '';
      break;
    case CLOSE_CONTACT_FORM:
      draft.openFrm = false;
      draft.formValues = null;
      draft.avatarInit = '';
      draft.notifMsg = notif.discard;
      break;
    case EDIT_CONTACT: {
      editingIndex = draft.contactList.findIndex((obj) => obj.id === action.item.id);
      draft.openFrm = true;
      draft.selectedId = action.item.id;
      draft.formValues = action.item;
      draft.avatarInit = action.item.avatar;
      break;
    }
    case SUBMIT_CONTACT: {
      const initItem = action.newData;
      if (draft.selectedId === action.newData.id) {
        // Update data
        const avatar = action.avatar !== '' ? action.avatar : state.avatarInit;
        const newItem = {
          ...initItem,
          avatar
        };
        draft.contactList[editingIndex] = newItem;
        draft.notifMsg = notif.updated;
      } else {
        // Insert data
        const avatar = action.avatar !== '' ? action.avatar : '/images/pp_boy.svg';
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const newItem = {
          ...initItem,
          id,
          avatar,
          favorited: false
        };
        draft.contactList.unshift(newItem);
        draft.selectedIndex = 0;
        draft.notifMsg = notif.saved;
      }
      draft.formValues = null;
      draft.avatarInit = '';
      draft.openFrm = false;
      break;
    }
    case SHOW_DETAIL_CONTACT: {
      const index = state.contactList.indexOf(action.item);
      draft.selectedIndex = index;
      draft.showMobileDetail = true;
      break;
    }
    case HIDE_DETAIL:
      draft.showMobileDetail = false;
      break;
    case DELETE_CONTACT: {
      const index = draft.contactList.findIndex((obj) => obj.id === action.item.id);
      draft.contactList.splice(index, 1);
      draft.notifMsg = notif.removed;
      break;
    }
    case TOGGLE_FAVORITE: {
      const index = draft.contactList.findIndex((obj) => obj.id === action.item.id);
      draft.contactList[index].favorited = !draft.contactList[index].favorited;
      break;
    }
    case CLOSE_NOTIF:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default contactReducer;

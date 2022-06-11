import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_DATA,
  ADD_EMPTY_ROW,
  UPDATE_ROW,
  REMOVE_ROW,
  EDIT_ROW,
  SAVE_ROW
} from '../constants/crudTbConstants';

const initialState = {
  dataTable: [],
  dataInit: [
    {
      id: 0,
      category: '',
      price: '',
      date: '',
      time: '',
      name: '',
      available: false,
      edited: true,
    }
  ],
  notifMsg: '',
};

const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = Object.keys(keyTemplate);
  const staticKey = {
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
  };
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== 'id' && rawKey[i] !== 'edited') {
      staticKey[rawKey[i]] = anchor[i].initialValue;
    }
  }
  // Push another static key
  staticKey.edited = true;

  return staticKey;
};

/* eslint-disable default-case, no-param-reassign */
const crudTbReducer = (state = initialState, action = {}) => produce(state, draft => {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${FETCH_DATA}`:
      draft.dataTable = action.items;
      break;
    case `${branch}/${ADD_EMPTY_ROW}`: {
      const raw = state.dataInit[state.dataInit.length - 1];
      const initial = initialItem(raw, action.anchor);
      draft.dataTable.unshift(initial);
      break;
    }
    case `${branch}/${REMOVE_ROW}`: {
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        draft.dataTable.splice(index, 1);
        draft.notifMsg = notif.removed;
      }
      break;
    }
    case `${branch}/${UPDATE_ROW}`: {
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      const cellTarget = action.event.target.name;
      const newVal = type => {
        if (type === 'checkbox') {
          return action.event.target.checked;
        }
        return action.event.target.value;
      };
      if (index !== -1) {
        draft.dataTable[index][cellTarget] = newVal(action.event.target.type);
      }
      break;
    }
    case `${branch}/${EDIT_ROW}`: {
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        draft.dataTable[index].edited = true;
      }
      break;
    }
    case `${branch}/${SAVE_ROW}`: {
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        draft.dataTable[index].edited = false;
        draft.notifMsg = notif.saved;
      }
      break;
    }
    case `${branch}/${CLOSE_NOTIF}`:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default crudTbReducer;

import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_DATA_FORM,
  ADD_NEW,
  CLOSE_FORM,
  SUBMIT_DATA,
  REMOVE_ROW_FORM,
  EDIT_ROW_FORM
} from '../constants/crudTbFrmConstants';

const initialState = {
  dataTable: [],
  dataInit: [
    {
      empName: 'Just write',
      empCode: 'test123',
      empEmail: 'mail@dandelion.com',
      empPhone: '000000000',
      empDesignation: 'Executive',
      empDept: 'Finance',
      empSubDept: 'Billing',
      empManager: 'Kumar1',
    }
  ],
  formValues: {},
  editingId: '',
  showFrm: false,
  notifMsg: '',
};

const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = Object.keys(keyTemplate);
  const staticKey = {};
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== 'id') {
      const itemIndex = anchor.findIndex(a => a.name === rawKey[i]);
      staticKey[rawKey[i]] = anchor[itemIndex].initialValue;
    }
  }

  return staticKey;
};
let editingIndex = 0;

/* eslint-disable default-case, no-param-reassign */
const crudTbFrmReducer = (state = initialState, action = {}) => produce(state, draft => {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${FETCH_DATA_FORM}`:
      draft.dataTable = action.items;
      break;
    case `${branch}/${ADD_NEW}`: {
      const raw = state.dataInit[state.dataInit.length - 1];
      const initial = initialItem(raw, action.anchor);
      draft.formValues = initial;
      draft.showFrm = true;
      break;
    }
    case `${branch}/${SUBMIT_DATA}`: {
      if (draft.editingId === action.newData.id) {
        // Update data
        draft.notifMsg = notif.updated;
        draft.dataTable[editingIndex] = action.newData;
      } else {
        // Insert data
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const newItem = {
          ...action.newData,
          id
        };
        draft.dataTable.unshift(newItem);
        draft.notifMsg = notif.saved;
      }
      draft.showFrm = false;
      draft.formValues = {};
      break;
    }
    case `${branch}/${CLOSE_FORM}`:
      draft.formValues = {};
      draft.showFrm = false;
      break;
    case `${branch}/${REMOVE_ROW_FORM}`: {
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        draft.dataTable.splice(index, 1);
        draft.notifMsg = notif.removed;
      }
      break;
    }
    case `${branch}/${EDIT_ROW_FORM}`: {
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        editingIndex = state.dataTable.indexOf(action.item);
        draft.formValues = action.item;
        draft.editingId = action.item.id;
        draft.showFrm = true;
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

export default crudTbFrmReducer;

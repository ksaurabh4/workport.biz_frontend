import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF, GET_ERROR_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_DATA_FORM,
  ADD_NEW,
  CLOSE_FORM,
  SUBMIT_DATA,
  REMOVE_ROW_FORM,
  EDIT_ROW_FORM
} from './employeeTableConstants';

const initialState = {
  dataTable: [],
  dataInit: [
    {
      id: '0',
      empName: '',
      empCode: '',
      empEmail: '',
      empPhone: '',
      empDesignation: '',
      empDept: '',
      empSubDept: '',
      empManager: '',
    }
  ],
  formValues: {},
  editingId: '',
  showFrm: false,
  formTitle: 'Add New',
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
const employeeTableReducer = (state = initialState, action = {}) => produce(state, draft => {
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
      draft.formTitle = 'Add New Employee';
      break;
    }
    case `${branch}/${SUBMIT_DATA}`: {
      if (draft.editingId === action.newData.id) {
        // Update data
        draft.showFrm = false;
        draft.notifMsg = notif.updated;
      } else {
        // Insert data
        draft.notifMsg = notif.saved;
        draft.showFrm = false;
        draft.formValues = {};
      }
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
        draft.formTitle = 'Edit Employee';
      }
      break;
    }
    case `${branch}/${GET_ERROR_NOTIF}`:
      draft.notifMsg = action.payload;
      break;
    case `${branch}/${CLOSE_NOTIF}`:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default employeeTableReducer;

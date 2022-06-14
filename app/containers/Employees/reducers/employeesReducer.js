import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF, GET_ERROR_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_EMPLOYEE_DATA,
  SEARCH_EMPLOYEE,
  ADD_EMPLOYEE_DATA,
  UPDATE_EMPLOYEE_DATA
} from './employeesConstants';

const initialState = {
  employeeList: [],
  keywordValue: '',
  notifMsg: '',
};

/* eslint-disable default-case, no-param-reassign */
const employeesReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_EMPLOYEE_DATA:
      draft.employeeList = action.items;
      break;
    case SEARCH_EMPLOYEE: {
      action.keyword.persist();
      const keyword = action.keyword.target.value.toLowerCase();
      draft.keywordValue = keyword;
      break;
    }
    case ADD_EMPLOYEE_DATA:
      draft.notifMsg = notif.addEmployeeData;
      break;
    case UPDATE_EMPLOYEE_DATA:
      draft.notifMsg = notif.updateEmployeeData;
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

export default employeesReducer;

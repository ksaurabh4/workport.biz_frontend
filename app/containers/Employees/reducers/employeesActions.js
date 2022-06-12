import * as notification from 'dan-redux/constants/notifConstants';
import * as types from './employeesConstants';

export const addAction = items => ({
  type: types.ADD_EMPLOYEE_DATA,
  items,
});

export const updateAction = items => ({
  type: types.UPDATE_EMPLOYEE_DATA,
  items,
});

export const fetchAction = items => ({
  type: types.FETCH_EMPLOYEE_DATA,
  items,
});

export const searchAction = keyword => ({
  type: types.SEARCH_EMPLOYEE,
  keyword,
});

export const detailAction = item => ({
  type: types.SHOW_DETAIL_EMPLOYEE,
  item
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};

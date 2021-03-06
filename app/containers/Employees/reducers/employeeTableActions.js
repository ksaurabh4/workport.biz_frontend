import * as notification from 'dan-redux/constants/notifConstants';
import * as types from './employeeTableConstants';

export const fetchAction = (items, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_FORM}`,
  items
});
export const clearAction = (branch) => ({
  branch,
  type: `${branch}/${types.CLEAR_DATA}`,
});
export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_NEW}`,
  anchor
});
export const closeAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_FORM}`
});
export const submitAction = (newData, branch) => ({
  branch,
  type: `${branch}/${types.SUBMIT_DATA}`,
  newData
});
export const removeAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.REMOVE_ROW_FORM}`,
  item
});
export const editAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.EDIT_ROW_FORM}`,
  item
});
export const selectAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.SELECT_ROW_FORM}`,
  item
});
export const showErrorNotifAction = (payload, branch) => ({
  branch,
  type: `${branch}/${notification.GET_ERROR_NOTIF}`,
  payload
});
export const showNotifAction = (payload, branch) => ({
  branch,
  type: `${branch}/${notification.SHOW_NOTIF}`,
  payload
});
export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${notification.CLOSE_NOTIF}`,
});

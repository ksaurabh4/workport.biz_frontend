import * as notification from 'dan-redux/constants/notifConstants';
import * as types from '../constants/authConstants';

export const loginAction = (payload) => ({ type: types.LOGIN, payload });
export const logoutAction = () => ({ type: types.LOGOUT });

export const showErrorNotifAction = (payload) => ({
  type: notification.GET_ERROR_NOTIF,
  payload
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};

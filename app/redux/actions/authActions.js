import * as types from '../constants/authConstants';

export const loginAction = (payload) => ({ type: types.LOGIN, payload });
export const logoutAction = () => ({ type: types.LOGOUT });

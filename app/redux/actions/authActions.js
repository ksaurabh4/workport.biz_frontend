import * as types from '../constants/authConstants';

export const loginAction = (payload) => {
  console.log(payload);
  return { type: types.LOGIN, payload };
};
export const logoutAction = () => ({ type: types.LOGOUT });

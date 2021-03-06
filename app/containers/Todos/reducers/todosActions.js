import * as notification from 'dan-redux/constants/notifConstants';
import * as types from './todosConstants';

export const addAction = items => ({
  type: types.ADD_TODO_DATA,
  items,
});

export const composeAction = {
  type: types.COMPOSE_TODO,
};

export const discardAction = {
  type: types.DISCARD_MESSAGE,
};

export const updateAction = items => ({
  type: types.UPDATE_TODO_DATA,
  items,
});

export const fetchAction = items => ({
  type: types.FETCH_TODO_DATA,
  items,
});

// export const fetchAllAction = items => ({
//   type: types.FETCH_TODO_LIST,
//   items,
// });

export const detailAction = item => ({
  type: types.SHOW_DETAIL_TODO,
  item
});

export const showErrorNotifAction = payload => ({
  type: notification.GET_ERROR_NOTIF,
  payload
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};

import * as notification from 'dan-redux/constants/notifConstants';
import * as types from './goalsConstants';

export const fetchGoalsAction = items => ({
  type: types.FETCH_GOALS_DATA,
  items,
});

export const openGoalAction = mail => ({
  type: types.OPEN_GOAL,
  mail,
});

export const filterGoalsAction = filter => ({
  type: types.FILTER_GOALS,
  filter,
});

export const composeGoalAction = {
  type: types.COMPOSE_GOAL,
};

export const sendGoalAction = (to, subject, content, attachment) => ({
  type: types.SEND_GOAL,
  to,
  subject,
  content,
  attachment,
});

export const discardAction = {
  type: types.DISCARD_MESSAGE,
};

export const searchGoalAction = keyword => ({
  type: types.SEARCH_GOAL,
  keyword,
});

export const deleteGoalAction = () => ({
  type: types.DELETE_GOAL,
});

export const toggleStaredAction = mail => ({
  type: types.TOGGLE_STARED,
  mail,
});

export const moveAction = (mail, category) => ({
  type: types.MOVE_TO,
  mail,
  category
});

export const setTabAction = payload => ({
  type: types.SET_TAB,
  payload
});

export const errorNotifAction = payload => ({
  type: notification.GET_ERROR_NOTIF,
  payload
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};

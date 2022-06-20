import * as notification from 'dan-redux/constants/notifConstants';
import * as types from './announcementConstants';

export const fetchAnnouncementAction = items => ({
  type: types.FETCH_ANNOUNCEMENT_DATA,
  items,
});

export const openAnnouncementAction = mail => ({
  type: types.OPEN_ANNOUNCEMENT,
  mail,
});

export const filterAction = filter => ({
  type: types.FILTER_ANNOUNCEMENT,
  filter,
});

export const composeAction = {
  type: types.COMPOSE_ANNOUNCEMENT,
};

export const sendAction = (to, subject, content, attachment) => ({
  type: types.SEND_ANNOUNCEMENT,
  to,
  subject,
  content,
  attachment,
});

export const discardAction = {
  type: types.DISCARD_MESSAGE,
};

export const searchAction = keyword => ({
  type: types.SEARCH_ANNOUNCEMENT,
  keyword,
});

export const deleteAction = () => ({
  type: types.DELETE_ANNOUNCEMENT,
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

export const errorNotifAction = payload => ({
  type: notification.GET_ERROR_NOTIF,
  payload
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};

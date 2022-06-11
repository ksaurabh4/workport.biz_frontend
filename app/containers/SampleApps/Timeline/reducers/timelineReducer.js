import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import dummy from 'dan-api/dummy/dummyContents';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_TIMELINE_DATA,
  POST,
  TOGGLE_LIKE,
  FETCH_COMMENT_DATA,
  POST_COMMENT
} from './timelineConstants';
import { getDate, getTime } from '../../../helpers/dateTimeHelper';

const initialState = {
  dataTimeline: [],
  commentIndex: 0,
  notifMsg: '',
};

const icon = privacyType => {
  switch (privacyType) {
    case 'public':
      return 'language';
    case 'friends':
      return 'people';
    default:
      return 'lock';
  }
};

const buildTimeline = (text, image, privacy) => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const imageSrc = image.length > 0 ? URL.createObjectURL(image[0]) : '';
  return {
    id,
    name: 'John Doe',
    date: getDate(),
    time: getTime(),
    icon: icon(privacy),
    avatar: dummy.user.avatar,
    image: imageSrc,
    content: text,
    liked: false,
    comments: []
  };
};

const buildComment = message => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  return {
    id,
    from: 'John Doe',
    avatar: dummy.user.avatar,
    date: getDate(),
    message
  };
};

/* eslint-disable default-case, no-param-reassign */
const timelineReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_TIMELINE_DATA:
      draft.dataTimeline = action.items;
      break;
    case POST:
      draft.dataTimeline.unshift(buildTimeline(action.text, action.media, action.privacy));
      draft.notifMsg = notif.posted;
      break;
    case TOGGLE_LIKE: {
      const index = draft.dataTimeline.findIndex((obj) => obj.id === action.item.id);
      draft.dataTimeline[index].liked = !draft.dataTimeline[index].liked;
      break;
    }
    case FETCH_COMMENT_DATA: {
      const index = draft.dataTimeline.findIndex((obj) => obj.id === action.item.id);
      if (index !== -1) {
        draft.commentIndex = index;
      }
      break;
    }
    case POST_COMMENT: {
      const comment = buildComment(action.comment);
      draft.dataTimeline[draft.commentIndex].comments.unshift(comment);
      draft.notifMsg = notif.commented;
      break;
    }
    case CLOSE_NOTIF:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default timelineReducer;

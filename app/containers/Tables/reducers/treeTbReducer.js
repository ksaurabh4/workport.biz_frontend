import produce from 'immer';
import { TOGGLE_TREE } from '../constants/treeTbConstants';

const initialState = {
  treeOpen: [],
  arrowMore: []
};

// Collect existing child and parent id's
function collectId(id, listedId, collapsed, arrowLess) {
  arrowLess.push(id);
  for (let i = 0; i < listedId.length; i += 1) {
    if (listedId[i].startsWith(id + '_')) {
      collapsed.push(listedId[i]);
      arrowLess.push(listedId[i]);
    }
  }
}

/* eslint-disable default-case, no-param-reassign */
const treeTbReducer = (state = initialState, action = {}) => produce(state, draft => {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${TOGGLE_TREE}`: {
      const listedId = state.treeOpen;
      const collapsed = [];
      const arrowLess = [];

      // Collect existing id
      collectId(action.keyID, listedId, collapsed, arrowLess);

      // Collapse and Expand row
      if (collapsed.length > 0) { // Collapse tree table
        draft.treeOpen = state.treeOpen.filter(x => collapsed.indexOf(x) < 0);
        draft.arrowMore = state.arrowMore.filter(x => arrowLess.indexOf(x) < 0);
      } else { // Expand tree table
        draft.arrowMore.push(action.keyID);
        action.child.map(item => {
          draft.treeOpen.push(item.id);
          return true;
        });
      }
      break;
    }
    default:
      break;
  }
});

export default treeTbReducer;

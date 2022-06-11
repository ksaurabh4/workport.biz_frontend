import produce from 'immer';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  FETCH_PRODUCT_DATA,
  ADD_TO_CART,
  DELETE_CART_ITEM,
  CHECKOUT,
  SHOW_DETAIL_PRODUCT,
  SEARCH_PRODUCT
} from './ecommerceConstants';

const initialState = {
  productList: [],
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  productIndex: 0,
  keywordValue: '',
  notifMsg: '',
};

let itemId = [];

/* eslint-disable default-case, no-param-reassign */
const ecommerceReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case FETCH_PRODUCT_DATA:
      draft.productList = action.items;
      break;
    case SEARCH_PRODUCT: {
      action.keyword.persist();
      const keyword = action.keyword.target.value.toLowerCase();
      draft.keywordValue = keyword;
      break;
    }
    case ADD_TO_CART: {
      const qty = Number(action.item.quantity);
      const price = Number(action.item.price);
      const index = itemId.indexOf(action.item.id);
      if (index !== -1) {
        // If item already added to cart
        draft.cart[index].quantity += qty;
      } else {
        // item not exist in cart
        itemId.push(action.item.id);
        draft.cart.push(action.item);
      }
      draft.totalItems += qty;
      draft.totalPrice += (price * qty);
      draft.notifMsg = notif.addCart;
      break;
    }
    case DELETE_CART_ITEM: {
      const index = draft.cart.findIndex((obj) => obj.id === action.item.id);
      const qty = Number(action.item.quantity);
      const newPrice = action.item.price;
      itemId = itemId.filter(item => item !== action.item.id);
      if (index !== -1) {
        draft.cart.splice(index, 1);
        draft.totalItems -= qty;
        draft.totalPrice -= (newPrice * qty);
        draft.notifMsg = notif.removed;
      }
      break;
    }
    case CHECKOUT:
      itemId = [];
      draft.cart = [];
      draft.totalItems = 0;
      draft.totalPrice = 0;
      draft.notifMsg = notif.checkout;
      break;
    case SHOW_DETAIL_PRODUCT: {
      const index = draft.productList.findIndex((obj) => obj.id === action.item.id);
      if (index !== -1) {
        draft.productIndex = index;
      }
      break;
    }
    case CLOSE_NOTIF:
      draft.notifMsg = '';
      break;
    default:
      break;
  }
});

export default ecommerceReducer;

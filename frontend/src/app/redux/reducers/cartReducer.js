import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  UPDATE_CART_QUANTITY_SUCCESS,
  UPDATE_CART_QUANTITY_FAILURE,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
} from '../actions/cartActions';

const initialState = {
  cartItems: [],
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
    case FETCH_CART_SUCCESS:
    case UPDATE_CART_QUANTITY_SUCCESS:
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        error: null,
      };
    case ADD_TO_CART_FAILURE:
    case FETCH_CART_FAILURE:
    case UPDATE_CART_QUANTITY_FAILURE:
    case DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

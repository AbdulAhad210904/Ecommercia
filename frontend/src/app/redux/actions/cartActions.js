import axios from 'axios';

export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const UPDATE_CART_QUANTITY_SUCCESS = 'UPDATE_CART_QUANTITY_SUCCESS';
export const UPDATE_CART_QUANTITY_FAILURE = 'UPDATE_CART_QUANTITY_FAILURE';
export const DELETE_CART_ITEM_SUCCESS = 'DELETE_CART_ITEM_SUCCESS';
export const DELETE_CART_ITEM_FAILURE = 'DELETE_CART_ITEM_FAILURE';

// Action creators
export const addToCart = (userId, productData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/api/add', { userId, ...productData });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/getcart`, { userId } );
    dispatch({
      type: FETCH_CART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.message,
    });
  }
};

export const updateCartQuantity = (userId, itemId, quantity) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/update/${itemId}`, { userId, quantity });
    dispatch({
      type: UPDATE_CART_QUANTITY_SUCCESS,
      payload: response.data.items,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_QUANTITY_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteCartItem = (userId, itemId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/delete/${itemId}`, { data: { userId } });
    dispatch({
      type: DELETE_CART_ITEM_SUCCESS,
      payload: response.data.items,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAILURE,
      payload: error.message,
    });
  }
};

import axios from 'axios';

export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

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

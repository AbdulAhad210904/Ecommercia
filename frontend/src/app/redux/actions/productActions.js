import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Action creator for fetching all products
export const fetchAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message
      });
    }
  };
};

// Action creator for fetching products by category
export const fetchProductsByCategory = (categoryId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message
      });
    }
  };
};

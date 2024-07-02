import axios from 'axios';

export const getProductData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      dispatch({
        type: 'getProductData',
        payload: response.data, 
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
};

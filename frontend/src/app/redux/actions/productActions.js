import axios from 'axios';

export const getProductData = () => {
  return async (dispatch) => {
    try {
      const {status,data} = await axios.get('https://api.escuelajs.co/api/v1/products');
      dispatch({
        type: 'getProductData',
        payload: data, 
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
};

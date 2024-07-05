import { combineReducers } from 'redux';
import productsReducer from '../products/productSlice';
import categoryReducer from '../categories/categorySlice';
import cartReducer from '../cart/cartSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoryReducer,
  cart: cartReducer,
});

export default rootReducer;

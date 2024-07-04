import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import CategoryReducer from "./cateogoryReducer";
import cartReducer from "./cartReducer";

const reducers = combineReducers({
    products: productsReducer,
    categories:CategoryReducer,
    cart: cartReducer,
    });
    
export default reducers;
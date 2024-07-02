import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import CategoryReducer from "./cateogoryReducer";

const reducers = combineReducers({
    products: productsReducer,
    categories:CategoryReducer
    });
    
export default reducers;
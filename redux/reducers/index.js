import { combineReducers } from "redux";
import userReducer from "./user";
import productReducer from "./product";
import auctionReducer from "./auction";
const rootReducer = combineReducers({
  userReducer,
  productReducer,
  auctionReducer,
});
export default rootReducer;

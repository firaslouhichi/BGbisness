import rootReducer from "../reducers";
import {thunk} from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";

const tt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, tt(applyMiddleware(thunk)));

export default store;

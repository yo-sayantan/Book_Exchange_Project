import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers/CombinedReducer";
import thunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
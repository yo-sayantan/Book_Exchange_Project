import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import MutualFundReducer from "./MutualFundReducer";

const reducers = combineReducers({
    login: LoginReducer,
    mutualfund: MutualFundReducer
});

export default reducers;
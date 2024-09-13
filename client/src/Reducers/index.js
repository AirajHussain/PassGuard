

import loginReducer from "./login"
import modalIndexReducer from "./modalIndex"
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loginReducer,
    modalIndexReducer
});

export default rootReducer;
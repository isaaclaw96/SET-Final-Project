import { combineReducers } from "redux";
import registerReducer from "./registerReducer.js";
import loginReducer from "./loginReducer.js";
import taskReducer from "./taskReducer.js";

export default combineReducers({

    register:registerReducer,
    login:loginReducer,
    // task:taskReducer,

});
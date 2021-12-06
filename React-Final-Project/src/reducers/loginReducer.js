import { LOGIN_USER, LOGIN_USER_FAIL, LOGOUT_USER,LOGIN_USER_WRONG_CREDENTIALS } from "../types";

const initialState = {
    data: [],
    error_list: [],
}

const loginReducer = (state,action) => {
    
    switch(action.type){
        case LOGIN_USER:
            return {
                data: action.payload,
            }
        
        case LOGIN_USER_WRONG_CREDENTIALS:
            return{
                data:action.payload
            }
        case LOGIN_USER_FAIL:
            return{
                error_list: action.payload.validation_errors,
            };
        case LOGOUT_USER:
            return initialState;
        default:
            return initialState;
    }
}

export default loginReducer;
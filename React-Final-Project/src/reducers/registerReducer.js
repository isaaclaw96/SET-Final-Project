import { CLEAR_REGISTER, REGISTER_USER, REGISTER_USER_FAIL } from "../types";

const initialState = {
    data: [],
    // username: {},
    // token: {},
    error_list: [],
}

const registerReducer = (state,action) => {
    if(state === undefined){
        return initialState;
    }
    switch(action.type){
        case REGISTER_USER:
            console.log("user success")
            return {
                data: action.payload,
                
            }
        
        case REGISTER_USER_FAIL:
            return{
                error_list: action.payload.validation_errors,
            };

        case CLEAR_REGISTER:
            return initialState;
            
        default:
            return initialState;
    }
}

export default registerReducer;
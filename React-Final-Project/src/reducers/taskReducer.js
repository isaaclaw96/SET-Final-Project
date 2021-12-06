import { CREATE_TASK,CREATE_TASK_ERROR,CREATE_TASK_FAIL } from "../types";

const initialState = {
    something:[],
    error_list: [],
};

const taskReducer = (state,action) => {
    
    switch(action.type){
        case CREATE_TASK:
            
            return {
                something: action.payload,
            }
        
        case CREATE_TASK_ERROR:
            
            return{
                something:action.payload
            }
        case CREATE_TASK_FAIL:
            
            return{
                error_list: action.payload.validation_errors,
            };
        default:
            return initialState;
    }
}

export default taskReducer;
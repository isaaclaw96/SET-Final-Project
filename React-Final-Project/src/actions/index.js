import {LOGIN_USER, LOGIN_USER_FAIL, REGISTER_USER, REGISTER_USER_FAIL, LOGOUT_USER, LOGIN_USER_WRONG_CREDENTIALS, CREATE_TASK,CREATE_TASK_ERROR,CREATE_TASK_FAIL, CLEAR_REGISTER} from "../types";
import axios from "axios";
import { ActionSheetIOS } from "react-native";

export const registerUser = (user) => (dispatch) => {

    try{
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        axios.post(`http://9908-49-124-200-218.ngrok.io/api/register`,user,{headers:{ 'Access-Control-Allow-Origin': '*','Content-Type':'application/json',}})
        .then((res)=>{
            
            if(res.data.status === 200){
                // if(res.data.data.status = '200')
                dispatch({
                    type:REGISTER_USER,
                    payload:res.data,
                });
            }
            else{
                
                //if error with input values
                dispatch({
                    type:REGISTER_USER_FAIL,
                    payload:res.data
                })
            }
        })
    }
    catch(error){

        //if fields are not fully filled
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:res.data
        })
    }
     
    }

export const loginUser = (user) => (dispatch) => {
    try{
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        axios.post(`http://9908-49-124-200-218.ngrok.io/api/login`,user,{headers:{ 'Access-Control-Allow-Origin': '*','Content-Type':'application/json',}})
        .then((res)=>{
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type:LOGIN_USER,
                    payload:res.data,
                });
            }
            else{
                dispatch({
                    type:LOGIN_USER_WRONG_CREDENTIALS,
                    payload:res.data
                })
            }
        })
    }
    catch(error){
        dispatch({
            type:LOGIN_USER_FAIL,
            payload:res.data
        })
    }
    
    }

export const logoutUser = () => (dispatch) => {
    dispatch({
        type:LOGOUT_USER,
    })
}

export const clearRegister = () => (dispatch) => {
    dispatch({
        type:CLEAR_REGISTER,
    })
}

export const createTask = (task) => (dispatch) => {
    try{
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get(`http://9908-49-124-200-218.ngrok.io/api/countTask/${id}`,{headers:{ 'Access-Control-Allow-Origin': '*','Content-Type':'application/json',}})
        .then((res)=>{
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type: CREATE_TASK,
                    payload: res.data,
                })
                // alert("Data successfully added!");
           }
        });
    }
    catch(error){
        console.log(error);
        // dispatch({
        //     type: CREATE_TASK_FAIL,
        //     payload: res.data,
        // });
    }
}

     
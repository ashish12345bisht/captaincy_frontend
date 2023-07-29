import {LOG_OUT, SAVE_AUTH } from "../../constants/constants";

const initialState = {
    data:{},
    token:null
}

export default (state=initialState,action)=>{
    switch(action.type){
        case SAVE_AUTH:
            return {...state,token:action?.payload?.token,data:action?.payload};
        case LOG_OUT:
            return {...state,token:null,data:{}};
        default:
            return state;
    }
}
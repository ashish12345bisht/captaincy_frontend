import { LOG_OUT, SAVE_AUTH } from "../../constants/constants"

export const saveAuth = (data)=>(dispatch) =>{
    return dispatch({type:SAVE_AUTH,payload:data})
}

export const logout = (data) => (dispatch) => {
    return dispatch({type:LOG_OUT,payload:data})
}
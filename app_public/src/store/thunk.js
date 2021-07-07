import axios from "axios";
import { loadUserInProgress, loadUserSuccess, loadUserFailure } from "./LoginAction";

export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch(loadUserInProgress);
        const res = await axios.get('/users/60c62c917fd5061be09b5c5c');
        const user = res.data;
        console.log("Inside thunk : " + JSON.stringify(user));
        dispatch(loadUserSuccess(user));
        
    } catch (e) {
        dispatch(loadUserFailure);
        dispatch(displayAlert(e));
    }
    
}

export const displayAlert = (e) => () => {
    alert(e);
}
import axios from "axios";
import { loadUserInProgress, loadUserSuccess, loadUserFailure } from "./LoginAction";
import { loadPostInProgress, loadPostSuccess, loadPostFailure } from "./PostAction";

export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch(loadUserInProgress);
        const userid = JSON.parse(sessionStorage.getItem('_id'));
        const res = await axios.get(`/users/${userid}`);
        const user = res.data;
        dispatch(loadUserSuccess(user));
        
    } catch (e) {
        dispatch(loadUserFailure);
        dispatch(displayAlert(e));
    }
    
}

export const displayAlert = (e) => () => {
    alert(e);
}

export const loadPost = () => async (dispatch, getState) => {
    try {
        dispatch(loadPostInProgress);
        const userid = JSON.parse(sessionStorage.getItem('_id'));
        const res = await axios.get(`/post/${userid}/posts`);
        const post = res.data;
        dispatch(loadPostSuccess(post));
    } catch (e) {
        dispatch(loadPostFailure);
        dispatch(displayAlert(e));
    }
}
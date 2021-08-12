import axios from "axios";
import { loadUserInProgress, loadUserSuccess, loadUserFailure } from "./LoginAction";
import { userLogout } from "./LogoutAction";
import { loadPostInProgress, loadPostSuccess, loadPostFailure } from "./PostAction";
import { loadUserListInProgress, loadUserListSuccess, loadUserListFailure } from "./UserListAction";

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

export const logoutUser = () => (dispatch, getState) => {
    dispatch(userLogout);
}

export const displayAlert = (e) => () => {
    alert(e);
}

export const loadPost = () => async (dispatch, getState) => {
    try {
        dispatch(loadPostInProgress);
        const userid = JSON.parse(sessionStorage.getItem('_id'));
        const res = await axios.get('/all-posts');
        const post = res.data;
        dispatch(loadPostSuccess(post));
    } catch (e) {
        dispatch(loadPostFailure);
        dispatch(displayAlert(e));
    }
}

export const loadUserList = () => async (dispatch, getState) => {
    try {
        dispatch(loadUserListInProgress);
        const userid = JSON.parse(sessionStorage.getItem('_id'));
        const res = await axios.get(`/all-users/${userid}`);
        const userList = res.data;
        dispatch(loadUserListSuccess(userList));
    } catch (e) {
        dispatch(loadUserListFailure);
        dispatch(displayAlert(e));
    }
}
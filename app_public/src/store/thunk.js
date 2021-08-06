import axios from "axios";
import { loadUserInProgress, loadUserSuccess, loadUserFailure } from "./LoginAction";
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

export const displayAlert = (e) => () => {
    alert(e);
}

export const loadPost = () => async (dispatch, getState) => {
    try {
        dispatch(loadPostInProgress);
        let followingArray = [
            "60f0bc9708f9562474e27f96",
            "60c772fcfc689926e817cf9b",
            "60e9f903217e3215fcf8153c",
            "6102136930b8141df48749e1"
        ];
        const userid = JSON.parse(sessionStorage.getItem('_id'));
        // const res = await axios.get(`/post/${userid}/posts`);
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
        dispatch(loadPostFailure);
        dispatch(displayAlert(e));
    }
}
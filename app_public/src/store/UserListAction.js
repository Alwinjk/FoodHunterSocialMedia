

export const LOAD_USERLIST_IN_PROGRESS = 'LOAD_USERLIST_IN_PROGRESS';
export const loadUserListInProgress = () => ({
    type: LOAD_USERLIST_IN_PROGRESS,
});

export const LOAD_USERLIST_SUCCESS = 'LOAD_USERLIST_SUCCESS';
export const loadUserListSuccess = userList => ({
    type: LOAD_USERLIST_SUCCESS,
    payload: { userList },
});

export const LOAD_USERLIST_FAILURE = 'LOAD_USERLIST_FAILURE';
export const loadUserListFailure = () => ({
    type: LOAD_USERLIST_FAILURE,
});
export const LOAD_POST_IN_PROGRESS = 'LOAD_POST_IN_PROGRESS';
export const loadPostInProgress = () => ({
    type: LOAD_POST_IN_PROGRESS,
});

export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const loadPostSuccess = post => ({
    type: LOAD_POST_SUCCESS,
    payload: { post },
});

export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
export const loadPostFailure = () => ({
    type: LOAD_POST_FAILURE,
});
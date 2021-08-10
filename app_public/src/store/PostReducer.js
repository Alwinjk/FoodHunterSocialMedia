import { 
    LOAD_POST_SUCCESS,
    LOAD_POST_IN_PROGRESS,
    LOAD_POST_FAILURE,
} from "./PostAction";

export const post = (state = [], action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_POST_IN_PROGRESS:
        case LOAD_POST_SUCCESS:
            const { post } = payload;
            return post;
        case LOAD_POST_FAILURE:
        default:
            return state;
    }

}
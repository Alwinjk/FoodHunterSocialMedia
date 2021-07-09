import { 
    CURRENT_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_IN_PROGRESS,
    LOAD_USER_FAILURE

} from "./LoginAction";

export const isLoading = (state = false, action) => {
    const { type } = action;

    switch (type) {
        case LOAD_USER_IN_PROGRESS:
            return true;
        case LOAD_USER_SUCCESS:
        case LOAD_USER_FAILURE:
            return false;
        default: 
            return state;
    }
}

export const user = (state = [], action) => {
    const { type, payload } = action;

    switch(type) {
            
        case LOAD_USER_IN_PROGRESS:
        case LOAD_USER_SUCCESS:
            const { user } = payload;
            return user;
        case LOAD_USER_FAILURE:
        default:
            return state;
    }

}

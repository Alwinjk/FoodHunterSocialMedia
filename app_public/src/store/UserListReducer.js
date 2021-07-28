import { 
    LOAD_USERLIST_SUCCESS,
    LOAD_USERLIST_IN_PROGRESS,
    LOAD_USERLIST_FAILURE

} from "./UserListAction";

export const userList = (state = [], action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_USERLIST_IN_PROGRESS:
        case LOAD_USERLIST_SUCCESS:
            const { userList } = payload;
            return userList;
        case LOAD_USERLIST_FAILURE:
        default:
            return state;
    }

}
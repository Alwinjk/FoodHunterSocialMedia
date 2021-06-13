const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                token: null,
                isFetching: false,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                token: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                token: action.payload,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default AuthReducer;
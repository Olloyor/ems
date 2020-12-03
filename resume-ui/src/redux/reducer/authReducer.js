import * as AUTH_ACTION from "../actionTypes/authAction";


const initialState = {
    isAuthenticated: false,
    user: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_ACTION.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AUTH_ACTION.USER_ME_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.data
            }
        case AUTH_ACTION.USER_LOGOUT:
        case AUTH_ACTION.USER_LOGIN_ERROR:
        case AUTH_ACTION.USER_ME_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        default:
            return state;
    }
}

import * as ADMIN_ACTION from "../actionTypes/adminAction";


const initialState = {
    usersListPage: {},
    user: {},

};

export default function(state = initialState, action) {

    switch (action.type) {
        case ADMIN_ACTION.ADMIN_USER_LIST_SUCCESS:
            return {
                ...state,
                usersListPage: action.payload,
            };
        case ADMIN_ACTION.ADMIN_USER_BY_ID_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case ADMIN_ACTION.ADMIN_USER_ADD_SUCCESS:
            return {
                ...state,
            }
        case ADMIN_ACTION.ADMIN_USER_RESUME_EDIT_SUCCESS:
            return {
                ...state,

            }
        case ADMIN_ACTION.ADMIN_USER_DELETE_SUCCESS:
            return {
                ...state,

            }
        case ADMIN_ACTION.ADMIN_USER_SEE:
            return {
                ...state,
                user: action.payload

            }

        default:
            return state;
    }
}

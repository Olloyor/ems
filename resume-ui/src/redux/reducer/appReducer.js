import * as API_ACTION from "../actionTypes/apiAction";


const initialState = {
    isLoading: false,
    isDark: true,

};

export default function(state = initialState, action) {
    switch (action.type) {
        case API_ACTION.LOADING_START:
            return {
                ...state,
                isLoading: true
            }
        case API_ACTION.LOADING_STOP:
            return {
                ...state,
                isLoading: false
            }
        case API_ACTION.THEME_TOGGLE:
            return {
                ...state,
                isDark: !this.isDark
            };
        default:
            return state;
    }
}

import * as typeApi from '../actionTypes/apiAction';



export const toggleTheme = () => async (dispatch) => {
    console.log(dispatch);
    console.log("BLA");
    dispatch({type: typeApi.THEME_TOGGLE})
}

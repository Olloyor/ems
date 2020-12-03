import * as typeApi from '../actionTypes/apiAction';
import * as typeAuth from '../actionTypes/authAction';
import {me, login, register} from '../../api/authApi';
import {TOKEN_NAME} from "../../utils/constants";
import setAuthToken from "../../utils/setAuthToken";


export const userMe = () => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await me().then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: typeAuth.USER_ME_SUCCESS,
                data: res.data.result
            })
        }
    }).catch(err => {
        console.log(err);
        dispatch({
            type: typeAuth.USER_ME_ERROR,
            data: err
        })
    }).finally((() => {
        dispatch({type: typeApi.LOADING_STOP})
    }))
}

export const userLogin = (data) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await login(data).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: typeAuth.USER_LOGIN_SUCCESS,
                payload: res.data
            })
            const token = res.data.result.tokenType+" "+res.data.result.accessToken;
            localStorage.setItem(TOKEN_NAME, token)
            setAuthToken(token);
            userMe();
        }
    }).catch(err => {
        console.log(err);
        dispatch({type: typeAuth.USER_LOGIN_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const userRegister = (data) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await register(data).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: typeAuth.USER_REGISTER_SUCCESS,
                payload: res.data
            })
            const token = res.data.result.tokenType+" "+res.data.result.accessToken;
            localStorage.setItem(TOKEN_NAME, token)
            setAuthToken(token);
            userMe();
        }
    }).catch(err => {
        console.log(err);
        dispatch({type: typeAuth.USER_REGISTER_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const userLogout = () => async (dispatch) => {
    dispatch({type: typeAuth.USER_LOGOUT})
}

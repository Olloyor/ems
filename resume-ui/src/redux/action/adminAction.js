import * as typeApi from '../actionTypes/apiAction';
import * as typeAdmin from '../actionTypes/adminAction';
import {usersList, userById, addUser, deleteUser, editUserResume} from '../../api/adminApi';


export const getUserList = (page, size) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await usersList(page, size).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: typeAdmin.ADMIN_USER_LIST_SUCCESS,
                payload: res.data
            })
        }
    }).catch(err => {
        dispatch({type: typeAdmin.ADMIN_USER_LIST_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const getUserById = (userId) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await userById(userId).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: typeAdmin.ADMIN_USER_BY_ID_SUCCESS,
                payload: res.data
            })
        }
    }).catch(err => {
        console.log(err);
        dispatch({type: typeAdmin.ADMIN_USER_BY_ID_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const userAdd = (data) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await addUser(data).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({ type: typeAdmin.ADMIN_USER_ADD_SUCCESS, payload: res.data })
        }
    }).catch(err => {
        console.log(err);
        dispatch({type: typeAdmin.ADMIN_USER_ADD_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const userEditResume = (resumeId, data) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await editUserResume(resumeId, data).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({type: typeAdmin.ADMIN_USER_RESUME_EDIT_SUCCESS, payload: res.data})
        }
    }).catch(err => {
        dispatch({type: typeAdmin.ADMIN_USER_RESUME_EDIT_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const userDelete = (userId) => async (dispatch) => {
    dispatch({type: typeApi.LOADING_START})
    await deleteUser(userId).then(res => {
        console.log(res);
        if (res.status === 200) {
            dispatch({type: typeAdmin.ADMIN_USER_DELETE_SUCCESS,payload: res.data})

        }
    }).catch(err => {
        console.log(err);
        dispatch({type: typeAdmin.ADMIN_USER_DELETE_ERROR})
    }).finally(() => {
        dispatch({type: typeApi.LOADING_STOP})
    })
}

export const setUser=(user)=> dispatch=>{
    dispatch({type: "ADMIN_USER_SEE", payload: user})
}

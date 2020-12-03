import HttpRequest from "../utils/HttpRequest";
import {BASE_URL} from "../utils/config";
import path from "./path";


export const usersList = (page= 0, size = 20) => {
    return HttpRequest.get(path.usersList+ `/?page=${page}&size=${size}`);
}

export const userById = (userId) => {
    return HttpRequest.get(path.usersList + `/${userId}`)
}

export const addUser = (data) => {
    return HttpRequest.post(path.usersList, data);
}

export const editUserResume = (resumeId, data)=>{
    return HttpRequest.put(path.usersResume+ `/${resumeId}`, data);
}

export const deleteUser = (userId)=>{
    return HttpRequest.delete(BASE_URL + path.usersList + `/${userId}`);
}

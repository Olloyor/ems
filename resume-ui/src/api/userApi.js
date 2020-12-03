import HttpRequest from "../utils/HttpRequest";
import path from "./path";


export const editUser = (data = {}) => {
    return HttpRequest.put(path.user, data);
}

export const addOrEditResume = (data = {}) => {
    return HttpRequest.post(path.userResume, data);
}

export const checkEmailAvailable = (email) => {
    return HttpRequest.get( path.userIsEmailAvailable+ `?email=${email}`);
}

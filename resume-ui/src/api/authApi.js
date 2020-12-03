import HttpRequest from "../utils/HttpRequest";
import path from "./path";


export const register = (data = {}) => {
    return HttpRequest.post(path.register, data);
}

export const login = (data = {}) => {
    return HttpRequest.post(path.login, data);
}

export const me = () => {
    return HttpRequest.get(path.me);
}

import axios from 'axios'
import {BASE_URL} from "./config";
import {TOKEN_NAME} from "./constants";


export default class HttpRequest {

    static headers = {'Access-Control-Allow-Origin': '*'};

    static makeRequest() {
        const token = localStorage.getItem(TOKEN_NAME);
        if (token) {
            HttpRequest.headers = {
                ...HttpRequest.headers,
                Authorization: token
            };
        }else {
            HttpRequest.headers = {
                ...HttpRequest.headers
            };
        }

        return axios.create({
            baseURL: BASE_URL,
            headers: {...HttpRequest.headers}
        });
    }

    static get(url, params = {}) {
        return HttpRequest.makeRequest().get(url, params)
    }

    static post(url, data) {
        return HttpRequest.makeRequest().post(url, data)
    }

    static put(url, data) {
        return HttpRequest.makeRequest().put(url, data)
    }

    static patch(url, data) {
        return HttpRequest.makeRequest().patch(url, data)
    }

    static delete(url, params = {}) {
        return HttpRequest.makeRequest().delete(url, params)
    }

}

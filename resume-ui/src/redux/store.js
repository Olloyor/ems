import {applyMiddleware, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
// import apiMiddleware from './ApiMiddleware'

import rootReducer from "./reducer";


const middleWares = [
    thunkMiddleware,
    // apiMiddleware,

].filter(Boolean);


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleWares),
        (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
);

export default store;

import {combineReducers} from "redux";
import app from "../reducer/appReducer";
import auth from "../reducer/authReducer";
import admin from "../reducer/adminReducer";

const rootReducer = combineReducers({
    app,
    auth,
    admin,
    // order,
})

export default rootReducer;

const disableDevToolsAll = () => {
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
        for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? () => {
            } : null;
        }
    }
}
const disableDevToolsProd = () => {
    if (process.env.NODE_ENV === "production" && typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
        for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? () => {
            } : null;
        }
    }
}
const disableReduxDevTool = () => {
    if (process.env.NODE_ENV === "production") {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "object") {
            for (let [key, value] of Object.entries(window.__REDUX_DEVTOOLS_EXTENSION__)) {
                window.__REDUX_DEVTOOLS_EXTENSION__[key] = typeof value == "function" ? () => {
                } : null;
            }
        }if(typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "object" || typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"){
            for (let [key, value] of Object.entries(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) {
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__[key] = typeof value == "function" ? () => {
                } : null;
            }
        }
    }
}

export {
    disableDevToolsAll,
    disableDevToolsProd,
    disableReduxDevTool,
};

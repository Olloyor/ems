import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import {Route, Redirect, Switch, Link} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import {WbSunny, Brightness3} from '@material-ui/icons'
import CssBaseline from '@material-ui/core/CssBaseline';
import {toggleTheme} from './redux/action/appAction';
import Login from "./page/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./page/Layout";
import MyAppBar from "./component/MyAppBar";
import {userMe} from "./redux/action/authAction";
import {TOKEN_NAME} from "./utils/constants";
import setAuthToken from "./utils/setAuthToken";
import UserDetails from "./page/UserDetails";

function App() {
    useEffect((() => {
        if (localStorage.getItem(TOKEN_NAME)){
            store.dispatch(userMe())
            // setAuthToken(localStorage.getItem(TOKEN_NAME))
        }else {
            setAuthToken(false);
        }

        if (localStorage.getItem("theme") && localStorage.getItem("theme") === "dark") {
            setDarkState(true);
        }
    }))
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const theme = createMuiTheme({
        palette: {
            type: palletType,
        }
    });
    const icon = !darkState ? <WbSunny/> : <Brightness3/>
    const handleThemeChange = () => {
        localStorage.setItem("theme", darkState ? "light" : "dark")
        setDarkState(!darkState);
        // toggleTheme();
    };
    return (
        <Provider store={store}>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MyAppBar toggleFunc={handleThemeChange} icon={icon}/>
                <Switch>
                    <PrivateRoute exact path={"/"} component={Layout}/>
                    <PrivateRoute path={"/view"} component={UserDetails}/>
                    <Route path={"/login"} component={Login}/>


                    <Redirect to="/" />
                </Switch>
            </ThemeProvider>

        </Provider>
    );
}

export default App;

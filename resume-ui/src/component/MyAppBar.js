import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {userLogout} from "../redux/action/authAction";
import {AppBar, IconButton, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

class MyAppBar extends Component {
    render() {
        return (
            <AppBar position="static" className="no-print">
                <Toolbar>
                    <Grid container direction="row" alignItems="center" justify="space-between">
                        <Typography variant="h6" className="">{this.props.appName}</Typography>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                            <IconButton edge="end" color="inherit" style={{marginRight: "10px"}}
                                        onClick={this.props.toggleFunc}>{this.props.icon}</IconButton>
                            {this.props.isAuthenticated &&
                            <Button onClick={this.props.userLogout}
                                    color="inherit"><ExitToAppRoundedIcon/> Logout</Button>}
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

MyAppBar.defaultProps = {
    appName: "EMS"
}

MyAppBar.propTypes = {
    appName: PropTypes.string.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    icon: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {userLogout})(MyAppBar);

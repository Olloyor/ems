import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Grid, Button, IconButton, FormControl, CircularProgress , InputLabel, OutlinedInput, FormHelperText, InputAdornment, Typography } from "@material-ui/core";

import {Visibility, VisibilityOff} from '@material-ui/icons';
import {connect} from "react-redux";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {userLogin} from '../redux/action/authAction';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordShow: false,
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.replace('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.replace("/");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    validate = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    })

    // handleChange = (event) => {
    //     const {name, value, type, checked} = event.target;
    //     type === "checkbox" ?
    //         this.setState({form: {...this.state.form, [name]: checked}}) :
    //         this.setState({form: {...this.state.form, [name]: value}})
    //
    // }

    toggleShowPassword = () => {
        this.setState({isPasswordShow: !this.state.isPasswordShow});
    };

    submit = (data) => {
        console.log(data)
        this.props.userLogin(data);
    }

    render() {

        return (
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={this.validate}
                onSubmit={fields => {
                    this.submit(fields)
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                }}
                render={({values, handleChange, handleBlur,errors, status, touched}) => (
                    <Container maxWidth={"xs"}>
                        {/*{console.log(values)}*/}
                        <Grid container spacing={3}
                              direction="column"
                              justify="center"
                              alignItems="center" style={{height: '90vh'}}>
                            <Form>
                                <Grid item xs={12} style={{marginTop: '50px'}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">
                                                Login for EMS
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl className="" variant="outlined" fullWidth>
                                                <InputLabel htmlFor="email">Email *</InputLabel>
                                                <OutlinedInput
                                                    error={errors.email && touched.email}
                                                    fullWidth
                                                    id="email"
                                                    name="email"
                                                    type={"text"}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete={"username"}
                                                    labelWidth={60}
                                                />
                                                <FormHelperText error={errors.email && touched.email}>{errors.email}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl className="" variant="outlined" fullWidth>
                                                <InputLabel htmlFor="password">Password *</InputLabel>
                                                <OutlinedInput
                                                    error={errors.password && touched.password}
                                                    fullWidth
                                                    id="password"
                                                    name="password"
                                                    type={this.state.isPasswordShow ? 'text' : 'password'}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete={"current-password"}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={this.toggleShowPassword}
                                                                onMouseDown={this.toggleShowPassword}
                                                                edge="end"
                                                            >
                                                                {this.state.isPasswordShow ? <Visibility/> :
                                                                    <VisibilityOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    labelWidth={80}
                                                />
                                                <FormHelperText error={errors.password && touched.password}>{errors.password}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button size="large" color="primary" fullWidth type="submit" style={{padding:'10px 20px'}}
                                                    disabled={this.props.isLoading} variant="contained">
                                                {this.props.isLoading? <CircularProgress color={"inherit"} size={27} />:"Log in"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Grid>
                    </Container>
                )}
            />
        );
    }
}

Login.propTypes = {};

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    isLoading: state.app.isLoading,
});

export default connect(mapStateToProps, {userLogin})(Login);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Drawer,
    Grid,
    Typography,
    TextField, Alert,
    FormControl,
    InputLabel, FormHelperText, FormControlLabel, Switch,
    OutlinedInput, InputAdornment, Button, IconButton, Input, colors, CircularProgress
} from "@material-ui/core";
import {Visibility, VisibilityOff, CloseRounded} from "@material-ui/icons";
import ChipInput from "material-ui-chip-input";
import * as Yup from "yup";
import {checkEmailAvailable} from '../api/userApi';
import {Formik, Form} from "formik";

class DrawerAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,

        }
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleChange = (name, value) => {
        console.log(value);
        this.setState({[name]: value})
    }

    validate = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid').required('Email is required')
            .test('checkEmailDupl', 'Email already exist', function (value) {
                return new Promise((resolve, reject) => {
                    checkEmailAvailable(value).then(res => {
                        resolve(res.data.result)
                    }).catch(err => {
                        console.log(err);
                        if (err.message !== "Network Error") {
                            resolve(true)
                        }
                    })
                })
            })
        ,
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(16, 'Password must be maximum 16 characters')
            .required('Password is required'),
        firstName: Yup.string().min(2, 'minimum 2').max(80, 'Maximum 80').required("First Name is required"),
        lastName: Yup.string().min(2, 'minimum 2').max(80, 'Maximum 80').required("Last Name is required"),
        sureName: Yup.string().min(2, 'minimum 2').max(80, 'Maximum 80').required("Sure Name is required"),
        bornDate: Yup.date().min(new Date('01-01-1900'), "Date must be bigger").max(new Date(), "Birthdate isn't valid").required("Birthdate is required"),
        nationality: Yup.string().required("Specify nationality"),
        // educations: Yup.array().of(Yup.string().required("Req")).required("Add Education"),
        // experiences: Yup.array().of(Yup.string()).required("Add Experiences"),
    })

    // handleAddChip = (chip) => {
    //     this.setState({
    //         educations: [...this.state.educations, chip]
    //     });
    // }
    //
    // handleDeleteChip = (chip, i) => {
    //     const newE = this.removeFromArr(this.state.educations,i);
    //     this.setState({educations: newE})
    //     console.log(newE)
    // }

    removeFromArr = (arr, i) => {
        return arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
    }

    submit = (date) => {
        if (this.state.educations.length > 0 && this.state.experiences.length > 0) {
            date.educations = this.state.educations;
            date.experiences = this.state.experiences;
            this.props.submit(date)
        } else {
            // return <Alert severity="warning">Please Fill All Forms!</Alert>
        }

    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    sureName: '',
                    bornDate: '',
                    nationality: '',
                    educations: this.state.educations,
                    experiences: this.state.experiences,
                    isPrivate: false,
                }}
                validationSchema={this.validate}
                onSubmit={fields => {
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    this.submit(fields)

                }}
                render={({values, handleChange, handleBlur, errors, status, touched}) => (
                    <Drawer anchor={"right"} open={this.props.isOpen}
                            onClose={() => this.props.toggle(this.props.isLoading)}>
                        <Container maxWidth={"sm"}>
                            <Form>
                                <Grid container spacing={1}>
                                    <Grid container
                                          direction="row"
                                          justify="space-between"
                                          alignItems="center" style={{margin: "20px 5px"}}>
                                        <Typography variant="h4">
                                            Add User
                                        </Typography>
                                        <IconButton style={{color: colors.red}}
                                                    onClick={() => this.props.toggle(this.props.isLoading)}>
                                            <CloseRounded color={"inherit"}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="email" name="email"
                                                   value={values.email} error={errors.email && touched.email}
                                                   helperText={errors.email}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   label="Email"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.password && touched.password}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText id="password"
                                                            error={errors.password && touched.password}>{errors.password}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth id="firstName" name="firstName"
                                                   value={values.firstName}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={errors.firstName && touched.firstName}
                                                   helperText={errors.firstName}
                                                   label="First Name"/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth id="lastName" name="lastName"
                                                   value={values.lastName}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={errors.lastName && touched.lastName}
                                                   helperText={errors.lastName}
                                                   label="Last Name"/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth id="sureName" name="sureName"
                                                   value={values.sureName}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={errors.sureName && touched.sureName}
                                                   helperText={errors.sureName}
                                                   label="Sure Name"/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth id="bornDate" name="bornDate"
                                                   value={values.borDate}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={errors.bornDate && touched.bornDate}
                                                   helperText={errors.bornDate}
                                                   label="Birthdate" type="date"
                                                   InputLabelProps={{shrink: true,}}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="nationality" name="nationality"
                                                   value={values.nationality}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={errors.nationality && touched.nationality}
                                                   helperText={errors.nationality}
                                                   label="Nationality"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ChipInput
                                            fullWidth
                                            label={"Add Educations"}
                                            value={this.state.educations}
                                            error={errors.educations && touched.educations}
                                            helperText={errors.educations}
                                            id="educations"
                                            name="educations"
                                            onBlur={handleBlur}
                                            onChange={(ed) => this.handleChange("educations", ed)}
                                            onDelete={(chip, i) => this.handleChange("educations", this.removeFromArr(this.state.educations, i))}
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <InputAdornment position="end">
                                            //             <CircularProgress size={18}/>
                                            //         </InputAdornment>
                                            //     )
                                            // }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ChipInput
                                            fullWidth
                                            label={"Add Experiences"}
                                            value={this.state.experiences}
                                            id="experiences"
                                            name="experiences"
                                            onChange={exps => this.handleChange("experiences", exps)}
                                            // onAdd={(chip) => this.handleAddChip(chip)}
                                            onDelete={(chip, i) => this.handleChange("experiences", this.removeFromArr(this.state.experiences, i))}
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <InputAdornment position="end">
                                            //             <CircularProgress size={18}/>
                                            //         </InputAdornment>
                                            //     )
                                            // }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={values.isPrivate}
                                                    value={values.isPrivate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    // onChange={handleChange}
                                                    name="isPrivate"
                                                    color="primary"
                                                />
                                            }
                                            label="Is resume private?"
                                        />
                                    </Grid>
                                    <Grid container spacing={3} style={{marginTop: '20px'}}>
                                        <Grid item xs={6}>
                                            <Button type="submit" disabled={this.props.isLoading} size="large"
                                                    variant="contained"
                                                    color="primary" fullWidth>
                                                {this.props.isLoading ?
                                                    <CircularProgress color={"inherit"} size={26}/> : "Save"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={() => this.props.toggle(this.props.isLoading)}
                                                    disabled={this.props.isLoading} size="large" color="secondary"
                                                    fullWidth>Cancel</Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Form>
                        </Container>
                    </Drawer>
                )}
            />
        );
    }
}

DrawerAddUser.propTypes = {
    submit: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,

};

export default DrawerAddUser;

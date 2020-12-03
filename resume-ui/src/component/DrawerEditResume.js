import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Yup from "yup";
import {
    Button, CircularProgress,
    colors, Container,
    Drawer, FormControlLabel,
    Grid, IconButton,
    Switch, TextField,
    Typography
} from "@material-ui/core";
import {CloseRounded} from "@material-ui/icons";
import {Form, Formik} from "formik";
import ChipInput from "material-ui-chip-input";
import moment from 'moment';

class DrawerEditResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            educations: this.props.editValue?.educations || [],
            experiences: this.props.editValue?.experiences || [],

        }
    }

    validate = Yup.object().shape({
        bornDate: Yup.date().min(new Date('01.01.1900'), "Date must be bigger").max(new Date(), "Birthdate isn't valid").required("Birthdate is required"),
        nationality: Yup.string().required("Specify nationality"),
        // educations: Yup.array().of(Yup.string().required("Req")).required("Add Education"),
        // experiences: Yup.array().of(Yup.string()).required("Add Experiences"),
    })

    handleChange = (name, value) => {
        console.log(value);
        this.setState({[name]: value})
    }
    removeFromArr = (arr, i) => {
        return arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
    }

    submit = (date) => {
        if (this.state.educations.length > 0 && this.state.experiences.length > 0) {
            date.educations = this.state.educations;
            date.experiences = this.state.experiences;
            this.props.submit(this.props.editValue.id,date)
        } else {
            // return <Alert severity="warning">Please Fill All Forms!</Alert>
        }
    }

    formatDate=(date)=>{
        return moment(date,"dd.MM.yyyy").format("yyyy-MM-DD")
    }


    render() {
        return (
            <Formik
                initialValues={{
                    bornDate: this.formatDate(this.props.editValue.bornDate),
                    nationality: this.props.editValue.nationality,
                    isPrivate: this.props.editValue.isPrivate,
                }}
                validationSchema={this.validate}
                onSubmit={fields => {
                    this.submit(fields)

                }}
                render={({values, handleChange, handleBlur, errors, status, touched}) => (
                    <Drawer anchor={"right"} open={this.props.isOpen}
                            onClose={() => this.props.toggle(this.props.isLoading)}>
                        <Container maxWidth={"sm"}>
                            <Form>
                                <Grid container spacing={1} style={{height: '100%'}}>
                                    <Grid container
                                          direction="row"
                                          justify="space-between"
                                          alignItems="center" style={{margin: "30px 6px"}}>
                                        <Typography variant="h4">
                                            Edit Resume
                                        </Typography>
                                        <IconButton style={{color: colors.red}}
                                                    onClick={() => this.props.toggle(this.props.isLoading)}>
                                            <CloseRounded color={"inherit"}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth id="bornDate" name="bornDate"
                                                   defaultValue={values.borDate}
                                                   value={values.borDate}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={errors.bornDate && touched.bornDate}
                                                   helperText={errors.bornDate}
                                                   label="Birthday" type="date"
                                                   InputLabelProps={{shrink: true,}}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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
                                            defaultValue={this.state.educations}
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
                                            defaultValue={this.state.experiences}
                                            value={this.state.experiences}
                                            id="experiences"
                                            name="experiences"
                                            onChange={exps => this.handleChange("experiences", exps)}
                                            // onAdd={(chip) => this.handleAddChip(chip)}
                                            onDelete={(chip, i) => this.handleChange("experiences", this.removeFromArr(this.state.experiences, i))}
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

                                    <Grid container spacing={3} style={{marginTop: '40px'}}>
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

DrawerEditResume.propTypes = {
    submit: PropTypes.func.isRequired,
    editValue: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default DrawerEditResume;

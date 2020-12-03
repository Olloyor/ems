import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Grid, Button, IconButton, Paper, Typography, CircularProgress} from "@material-ui/core";
import {PrintRounded, CloudDownloadRounded, ArrowBack} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {connect} from "react-redux";


class UserDetails extends Component {


    downloadPdf = ()=>{

    }

    back=()=>{
        this.props.history.replace("/")
    }

    render() {

        const user = this.props.user;

        return (

            <Container maxWidth={"md"} style={{marginTop: '30px', marginBottom: '40px'}}>
                <Paper elevation={0} style={{padding: "10px 30px", marginBottom:'20px'}} className="no-print">
                    <Grid container spacing={1} direction="row"
                          justify="space-between"
                          alignItems="center">
                        <Grid item xs={7} className="no-print">
                            <Button size="large" color="secondary" onClick={this.back}> <ArrowBack/> Back </Button>
                        </Grid>
                        <Grid item xs={5} className="no-print" container direction="row" justify="flex-end">
                            <IconButton onClick={() => window.print()}><PrintRounded/></IconButton>
                            {/*<IconButton onClick={() => this.downloadPdf()}><CloudDownloadRounded/></IconButton>*/}
                        </Grid>
                    </Grid>
                </Paper>
                {this.props.user ?
                    <Paper elevation={0} style={{padding: "30px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} textOverflow="ellipsis" overflow="hidden">
                            <Typography variant="h6">F.I.Sh
                                : {user.firstName + " " + user.lastName + " " + user.sureName}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Email : {user.email}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">Birthday : {user.resume?.bornDate}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Registered : {user.createdAt}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">Nationality : {user.resume?.nationality}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5">Educations : </Typography>
                            {user.resume && user.resume.educations.map((value, index) => {
                                return (
                                    <Typography align="center" key={index} variant="subtitle1"> {value}</Typography>)
                            })}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5">Experiences : </Typography>
                            {user.resume && user.resume.experiences.map((value, index) => {
                                return (
                                    <Typography align="center" key={index} variant="subtitle1"> {value}</Typography>)
                            })}
                        </Grid>
                    </Grid>
                </Paper> : <CircularProgress color={"inherit"} size={40}/>}
            </Container>
        );
    }
}

UserDetails.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.admin.user,
});

export default connect(mapStateToProps)(UserDetails);

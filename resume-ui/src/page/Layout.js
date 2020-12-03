import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {userAdd, getUserList, userDelete, userEditResume, setUser} from '../redux/action/adminAction';
import {Link} from "react-router-dom";
import {Container, Grid, Typography, Button, Chip, IconButton} from "@material-ui/core";
import {EditRounded, DeleteRounded, AddRounded, PrintRounded, MoreVertRounded} from "@material-ui/icons";
import DrawerAddUser from "../component/DrawerAddUser";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import AlertDialog from "../component/AlertDialog";
import DrawerEditResume from "../component/DrawerEditResume";


class Layout extends Component {
    constructor(props) {
        super(props);
        this.perPages = [5, 10, 25];
        this.state = {
            pageNumber: 0,
            pageSize: this.perPages[0],
            isOpenAddD: false,
            isOpenEditR: false,
            isOpenDelete: false,
            deleteId: null,
        };
    }

    componentDidMount() {
        this.props.getUserList(0, this.state.pageSize)
    }

    isEmpty = (data) => {
        return Object.keys(data).length === 0 || data === {} || data === undefined || data === null
    }

    handleChangePage = (event, newPage) => {
        this.setState({pageNumber: newPage})
        this.props.getUserList(newPage, this.state.pageSize)

    };

    handleChangeRowsPerPage = (e) => {
        const newSize = parseInt(e.target.value);
        this.setState({pageSize: newSize})

        this.props.getUserList(0, newSize);
    };

    handleClick = (user) => {
        console.log(user);
    }

    openOne = (user) => {
        this.props.setUser(user);
        this.props.history.push("/view");
    }

    openEditR = (resume) => {
        this.setState({editR: resume, isOpenEditR: true})
    }
    toggleEditR = () => {
        this.setState({editR: null, isOpenEditR: false})
    }
    submitEditR = (id, data) => {
        this.props.userEditResume(id, data);
        this.toggleEditR();
        setTimeout(() => {
            this.props.getUserList(this.props.pageNumber, this.state.pageSize)
        }, 700)
    }


    openAlert = (userId) => {
        this.setState({deleteId: userId, isOpenDelete: true})
    }
    closeAlert = () => {
        this.setState({deleteId: null, isOpenDelete: false})
    }
    agreeDelete = () => {
        // console.log(this.state.deleteId);
        this.props.userDelete(this.state.deleteId);
        this.closeAlert();
        setTimeout(() => {
            this.props.getUserList(this.props.pageNumber, this.state.pageSize)
        }, 700)
    }

    toggleDrawer = (bool) => {
        this.setState({isOpenAddD: bool})
    }
    submitAddUser = (data) => {
        this.props.userAdd(data)
        this.toggleDrawer(false);
        setTimeout(() => {
            this.props.getUserList(this.props.pageNumber, this.state.pageSize)
        }, 700)
    }


    render() {

        return (
            <Container maxWidth={"lg"} style={{marginTop: '30px'}}>
                <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                        <Button size="large" variant="contained" color="primary"
                                onClick={() => this.toggleDrawer(true)}><AddRounded/> Add User</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right"
                                    variant="h5">Hello! {this.props.user.firstName + " " + this.props.user.lastName}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} style={{marginTop: "30px", marginBottom: "40px"}}>

                        <Paper style={{padding: '10px'}}>
                            <TableContainer>
                                <Table
                                    aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding={'default'}>F.I.Sh</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Birth Day</TableCell>
                                            <TableCell>Nationality</TableCell>
                                            <TableCell align="right">Educations</TableCell>
                                            <TableCell align="right">Experiences</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.userList.content && this.props.userList.content.map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    style={{cursor: "pointer"}}
                                                    // onClick={(event) => this.handleClick(row)}
                                                    // aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    <TableCell component="th" id={row.id} scope="row" padding="none">
                                                        {row.firstName + " " + row.lastName + " " + row.sureName}
                                                    </TableCell>
                                                    <TableCell>{row.email}</TableCell>
                                                    <TableCell>{row.resume?.bornDate}</TableCell>
                                                    <TableCell>{row.resume?.nationality}</TableCell>
                                                    <TableCell align="right">{row.resume?.educations.map((ed, i) => {
                                                        return (<Chip key={i} label={ed}/>)
                                                    })}</TableCell>
                                                    <TableCell align="right">{row.resume?.experiences.map((ex, i) => {
                                                        return (<Chip key={i} label={ex}/>)
                                                    })}</TableCell>
                                                    <TableCell>
                                                        <Grid container direction="row" alignItems="center"
                                                              justify="flex-end" spacing={1}>
                                                            <IconButton
                                                                onClick={() => this.openOne(row)}><MoreVertRounded/></IconButton>
                                                            <IconButton
                                                                onClick={() => this.openEditR(row.resume)}><EditRounded/></IconButton>
                                                            {this.props.user.id !== row.id ?<IconButton color="secondary"
                                                                        onClick={() => this.openAlert(row.id)}><DeleteRounded/></IconButton>: "it's you"}
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={this.perPages}
                                component="div"
                                count={this.props.userList.totalElements || 0}
                                rowsPerPage={this.props.userList.size || 5}
                                page={this.props.userList.number || 0}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </Paper>

                    </Grid>

                </Grid>
                <AlertDialog handleClose={this.closeAlert} isOpen={this.state.isOpenDelete}
                             isLoading={this.props.isLoading}
                             handleAgree={this.agreeDelete} title="Really want to delete?"
                             description="If this user deleted user's resume also deleted!"/>
                <DrawerAddUser submit={this.submitAddUser} isOpen={this.state.isOpenAddD} toggle={this.toggleDrawer}
                               isLoading={this.props.isLoading}/>
                {this.state.editR &&
                <DrawerEditResume submit={this.submitEditR} isOpen={this.state.isOpenEditR} editValue={this.state.editR}
                                  isLoading={this.props.isLoading} toggle={this.toggleEditR}/>}
            </Container>
        );
    }
}

Layout.propTypes = {
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    userAdd: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    userList: state.admin.usersListPage,
    user: state.auth.user,
    isLoading: state.app.isLoading,
});

export default connect(mapStateToProps, {userAdd, getUserList, userDelete, userEditResume, setUser})(Layout);

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';

class AlertDialog extends React.Component {

    render() {
        const { isLoading, isOpen, title, description} = this.props;

        return (
            <div>
                <Dialog
                    open={isOpen}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isLoading} onClick={this.props.handleClose} color="primary">
                            NO
                        </Button>
                        <Button disabled={isLoading} onClick={this.props.handleAgree} color="primary" autoFocus>
                            {isLoading? <CircularProgress size={18}/> :"YES"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AlertDialog.defaultProps = {
    title: "Use Google's location service?",
    description: "Let Google help apps determine location. This means sending anonymous location data to\n" +
        " Google, even when no apps are running."
}

AlertDialog.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleAgree: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default AlertDialog;

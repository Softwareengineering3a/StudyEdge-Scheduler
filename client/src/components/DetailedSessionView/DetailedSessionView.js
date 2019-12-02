import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { DateTime } from "luxon";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ConfirmReservation from '../ConfirmReservation/ConfirmReservation';
import jwt_decode from 'jwt-decode';
import axios from 'axios';


class DetailedSessionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRes: false,
            session: this.props.session,
            studentUser: this.props.user,
            isAdmin: false,
            checkOnce: true,
            setOpen: false
        };
        this.displayReservation = this.displayReservation.bind(this);
        this.disableReservation = this.disableReservation.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        // Returns undefined 
        // this.checkAdmin = this.checkAdmin.bind(this);
    }

    displayReservation = () => {
        this.setState({
            showRes: true,
        });
    }
    disableReservation = () => {
        this.setState({
            showRes: false,
        });
    }

    handleClickOpen = () => {
        this.setState({
            setOpen: true,
        });
    }

    handleClickClose = () => {
        this.setState({
            setOpen: false,
        });
    }

    handleRemove = e => {
        axios.delete(`http://localhost:5000/sessions/${this.props.session._id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
            window.location.reload();
    };


    render() {

        let mySessions = this.props.session;

        //ADMIN CHECK
        if (this.state.checkOnce) {

            try {
                var token = localStorage.getItem('jwtToken');
                var decoded = jwt_decode(token);
                if (decoded.username === "admin") {
                    this.setState({
                        isAdmin: true,
                    });
                }
            } catch (error) {
                this.setState({
                    checkOnce: false,
                });
            }
        }

        return (
            <Grid>
                {this.state.showRes ?
                    <ConfirmReservation sessionRes={this.state.session} disableReservation={this.disableReservation} user={this.state.studentUser} /> :
                    <Grid container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        spacing={4}
                    >
                        <Grid item
                        >
                            <Grid container
                                direction="row"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconButton onClick={this.props.disableDetailedSession} >
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" >
                                        Session Details
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary"
                            >
                                <Grid item style={{ width: 350 }}>
                                    <Grid >
                                        <Grid container
                                            direction="column"
                                            spacing={1}
                                        >
                                            <Grid item>
                                                <Grid container
                                                    direction="column"
                                                    alignItems="center"
                                                    justify="center"
                                                    spacing={0}
                                                >
                                                    <Grid>
                                                        <Typography variant="button">{mySessions.class}</Typography>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography variant="button">{mySessions.title}</Typography>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography variant="button"> Study Expert: {mySessions.tutor}</Typography>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography variant="button">{mySessions.location}</Typography>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography variant="button">{DateTime.fromISO(mySessions.date).toFormat('ff')}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Grid container
                                                    direction="column"
                                                    alignItems="center"
                                                    justify="center"
                                                    spacing={0}
                                                >
                                                    <Grid>
                                                        <Typography variant="button">Note: </Typography>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography variant="button">{mySessions.notes}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container justify="flex-end">
                                                    <Typography variant="body1">{mySessions.students.length}/{mySessions.slots}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                        {this.state.isAdmin ?
                            <Grid item
                                style={{ height: 350 }}>
                                <Grid container
                                    direction="column"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Button variant="contained" color="secondary">
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={this.handleClickOpen}>
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>
                                            Notify
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid> :
                            <Grid item>
                                <Grid container
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                    spacing={0}
                                >
                                    <Grid item>
                                        <Button variant="contained" color="secondary" size="large" onClick={this.displayReservation}>
                                            Reserve
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        }
                    </Grid>
                }
                <Dialog
                    open={this.state.setOpen}
                    onClose={this.handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you would like to delete this session?"}</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickClose} color="primary">Go back</Button>
                        <Button onClick={this.handleRemove} color="primary" autoFocus>Delete Session</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

export default DetailedSessionView;
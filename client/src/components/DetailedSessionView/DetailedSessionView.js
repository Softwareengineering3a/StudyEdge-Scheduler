import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { DateTime } from "luxon";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ConfirmReservation from '../ConfirmReservation/ConfirmReservation';
import EditSesh from './EditSessionForm';
import ViewStudents from '../ViewStudents/ViewStudents';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

class DetailedSessionView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showRes: false, //Show student booking page
            session: this.props.session, //current session interaction
            studentUser: this.props.user, //UFL email address
            isAdmin: false, //Admin Checks
            checkOnce: true, //Admin Check
            showEditSession: false, //Show Edit Session component
            setOpen: false, //Student notify button message for admin
            viewstudents: false, //shows students in session
            title: this.props.session.title,
            course: this.props.session.course,
            location: this.props.session.location,
            date: this.props.session.date,
            slots: this.props.session.slots,
            notes: this.props.session.notes,
            tutor: this.props.session.tutor,
            note: "",
            setOpen2: false, //Student notify popup textbox allowing admin to send custom message to students
        };
        this.displayReservation = this.displayReservation.bind(this); //Show student booking reservation page
        this.disableReservation = this.disableReservation.bind(this); //Hide student booking reservation page
        this.displayEditSesh = this.displayEditSesh.bind(this); //Show Edit Session component
        this.disableEditSesh = this.disableEditSesh.bind(this); //Hides Edit Session component
        this.enableStudents = this.enableStudents.bind(this); //Shows View Student component
        this.disableStudents = this.disableStudents.bind(this); //Hides View Student component
    }
    //Handle User Input Entry and save inputs to states
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    //Show student booking reservation page
    displayReservation = () => {
        this.setState({
            showRes: true,
        });
    }

    //Hide student booking reservation page
    disableReservation = () => {
        this.setState({
            showRes: false,
        });
    }

    //Show Edit Session component
    displayEditSesh = (session) => {
        this.setState({
            showEditSession: true,
        });
    }

    //Hides Edit Session component
    disableEditSesh = () => {
        this.setState({
            showEditSession: false,
        });
    }

    //Shows View Student component
    enableStudents = () => {
        this.setState({
            viewstudents: true,
        });
    }

    //Hides View Student component
    disableStudents = () => {
        this.setState({
            viewstudents: false,
        });
    }

    //Opens type notification message popup
    handleNote = () => {
        this.setState({
            setOpen2: true,
        })
        console.log(this.state.setOpen2)
    }

    //Handles email sending, uses axios post to request the back end server to send an email by using HTTP request POST
    //and sends the session, emails, and note to be sent to students
    handleNotify = () => {
        this.state.session.students.map(element => {
            axios.post(`/students`, {
                email: element[3],
                session: this.state.session,
                note: this.state.note,
            }).then(function (response) {
                console.log(response)
            })
                .catch(function (error) {
                    console.log(error)
                });
        });
        this.setState({
            setOpen: true,
        });
        this.setState({
            setOpen2: false,
        })
    }

    //Handles popup message open and close
    handleClickClose = () => {
        this.setState({
            setOpen: false,
            setOpen2: false
        });
    }

    render() {
        let mySessions = this.props.session;

        //Allows for admin to click on overbooked session even when students are prevented
        //Checks if admin web token is saved to local storage (is admin logged in?)
        if (this.state.checkOnce) {
            try {
                //JSON Web Token (Jwt)
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

        //Shows View Students component
        if (this.state.viewstudents) {
            return (
                <ViewStudents
                    disableStudents={this.disableStudents}
                    session={this.state.session}
                />
            );
        }

        //Component Structure
        return (
            <Grid>
                {this.state.showRes ?
                    <ConfirmReservation
                        sessionRes={this.state.session}
                        disableReservation={this.disableReservation}
                        user={this.state.studentUser}
                    />
                    :
                    this.state.showEditSession ?
                        <EditSesh session={mySessions} disableEditSesh={this.disableEditSesh} />
                        :
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                            spacing={4}
                            style = {{width: 470}}
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
                                <Box
                                    border={1}
                                    color="primary"
                                    borderColor="primary.main"
                                    borderRadius={4}
                                >
                                    <Grid item style={{ width: 400 }}>
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
                                                            <Typography color="primary" variant="button">{mySessions.class}</Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography color="primary" variant="button">{mySessions.title}</Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography color="primary" variant="button"> Study Expert: {mySessions.tutor}</Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography color="primary" variant="button">{mySessions.location}</Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography color="primary" variant="button">{DateTime.fromISO(mySessions.date).toFormat('ff')}</Typography>
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
                                                            <Typography color="primary" variant="button">Note: </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography color="primary" variant="button">{mySessions.notes}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container justify="flex-end">
                                                        <Typography color="primary" variant="button">Slots: {mySessions.students.length}/{mySessions.slots}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            {/* If admin is present then present admin with appropriate buttons */}
                            {this.state.isAdmin ?
                                <Grid item
                                    style={{ height: 350 }}>
                                    <Grid container
                                        direction="row"
                                        spacing={4}
                                        alignItems="center"
                                        justify = "center"
                                    >
                                        <Grid item>
                                            <Button variant="contained" size="large" color="secondary" onClick={this.enableStudents}>
                                                View Students
                                        </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container
                                    direction="row"
                                    spacing={4}
                                    alignItems="center"
                                    justify = "center">
                                         <Grid item>
                                            <Button variant="contained" size="large" color="primary" onClick={this.displayEditSesh}>
                                                Edit
                                        </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" size="large" color="primary" endIcon={<Icon>send</Icon>} onClick={this.handleNote}>
                                                Notify
                                            </Button>
                                        </Grid>
                                        </Grid>
                                </Grid> :
                                /* Shows student reserve button if not admin */
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
                    <DialogTitle id="alert-dialog-title">{"Students Notified"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClickClose} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open = {this.state.setOpen2}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form 
                        autoComplete="off"
                    >
                       <Grid item>
                            <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
                                <TextField
                                    variant="outlined"
                                    id="standard-required"
                                    type="text"
                                    name="note"
                                    value={this.state.note}
                                    onChange={this.handleInputChange}               
                                />
                        </Grid>
                        <DialogActions>
                            <Button onClick={this.handleClickClose} color="primary">Back</Button>
                            <Button  color="primary" onClick={this.handleNotify}>
                                Send
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Grid>
        );
    }
}

export default DetailedSessionView;

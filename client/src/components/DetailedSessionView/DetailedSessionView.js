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
            showEditSession: false,
            setOpen: false,
            title: this.props.session.title,
            course: this.props.session.course,
            location: this.props.session.location,
            date: this.props.session.date,
            slots: this.props.session.slots,
            notes: this.props.session.notes,
            tutor: this.props.session.tutor,
        };
        this.displayReservation = this.displayReservation.bind(this);
        this.disableReservation = this.disableReservation.bind(this);
        this.displayEditSesh = this.displayEditSesh.bind(this);
        this.disableEditSesh = this.disableEditSesh.bind(this);
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
    displayEditSesh = (session) => {
        this.setState({
            showEditSession: true,
        });
    }
    disableEditSesh = () => {
        this.setState({
            showEditSession: false,
        });
    }
    handleNotify = () => {
        this.state.session.students.map(element => {
            axios.post(`/students`, {
                email: element[3],
                session: this.state.session,
            }).then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        });
    }

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
                                                <Grid container justify="center">
                                                    <Typography variant="button">Slots Booked: {mySessions.students.length}/{mySessions.slots}</Typography>
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
                                    direction="row"
                                    spacing={4}
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Button variant="contained" size = "large" color="secondary" onClick={this.displayEditSesh}>
                                            Edit
                                        </Button>
                                    </Grid>
                                    
                                    <Grid item>
                                        <Button variant="contained" size = "large" color="primary" endIcon={<Icon>send</Icon>} onClick ={this.handleNotify}>
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

            </Grid>
        );
    }
}

export default DetailedSessionView;

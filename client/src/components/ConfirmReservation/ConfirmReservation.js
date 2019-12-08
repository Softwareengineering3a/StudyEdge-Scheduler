import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const style = {
    text: {
        width: 435,
    },
};

class ConfirmReservation extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            sessions: '',
            notes: '',
            user: this.props.user,
            redirectbool: false
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        var url = '/sessions/' + this.props.sessionRes._id;
        console.log(url);
        axios.put(url, {
            "title": this.props.sessionRes.title,
            "class": this.props.sessionRes.class,
            "location": this.props.sessionRes.location,
            "date": this.props.sessionRes.date,
            "slots": this.props.sessionRes.slots,
            "notes": this.props.sessionRes.notes,
            "tutor": this.props.sessionRes.tutor,
            "students": [this.state.user, this.state.firstname, this.state.lastname, this.state.email, this.state.phonenumber, this.state.notes],
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });

        // this.setState({
        //     setOpen: true,
        // });
        e.preventDefault();
    }
    handleClickClose = () => {
        window.location.reload(false);
        this.setState({
            setOpen: false,
        });
    }


    render() {

        return (
            <main>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={8}
                >
                    <Grid item>
                        <Grid container
                            direction="row"
                            alignItems="center"
                        >
                            <Grid item>
                                <IconButton onClick={this.props.disableReservation} >
                                    <ArrowBackIosIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" className="center">
                                    Enter Your Details
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <form autoComplete="off">
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    spacing={4}
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">First Name *</Typography>
                                        <TextField
                                            required
                                            variant="outlined"
                                            id="standard-required"
                                            type="text"
                                            name="firstname"
                                            onChange={this.handleInputChange}
                                            value={this.state.firstname}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">Last Name *</Typography>
                                        <TextField
                                            required
                                            variant="outlined"
                                            id="standard-required"
                                            type="text"
                                            name="lastname"
                                            onChange={this.handleInputChange}
                                            value={this.state.lastname}
                                        />
                                    </Grid>


                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    spacing={4}
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">Preferred Email *</Typography>
                                        <TextField
                                            required
                                            variant="outlined"
                                            id="standard-required"
                                            type="text"
                                            name="email"
                                            style={style.text}
                                            onChange={this.handleInputChange}
                                            value={this.state.email}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container
                                    direction="row"
                                    spacing={4}
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">Phone Number *</Typography>
                                        <TextField
                                            required
                                            variant="outlined"
                                            id="standard-required"
                                            type="text"
                                            name="phonenumber"
                                            style={style.text}
                                            onChange={this.handleInputChange}
                                            value={this.state.phonenumber}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container
                                    direction="row"
                                    spacing={4}
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">Notes </Typography>
                                        <TextField
                                            variant="outlined"
                                            id="standard-required"
                                            type="text"
                                            name="notes"
                                            style={style.text}
                                            onChange={this.handleInputChange}
                                            value={this.state.notes}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container
                                    direction="column"
                                    spacing={5}
                                    alignItems="center"
                                    style={{ height: 250 }}>
                                    <Grid item>
                                        <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>Reserve</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                        <Dialog
                            open={this.state.setOpen}
                            onClose={this.handleClickClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Reservation Confirmed"}</DialogTitle>
                            <DialogActions>
                                <Button onClick={this.handleClickClose} color="primary">Ok</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </main>
        )
    }
}
export default ConfirmReservation;
import React, { useState, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import './EditSessionForm.css';
import { Typography } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export function DatePicker(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                variant="inline"
                value={selectedDate}
                onChange={handleDateChange}
                onError={console.log}
                disablePast
                format="MM/dd/yyyy hh:mm a"
                label="Required"
            />
        </MuiPickersUtilsProvider>
    );
}

const style = {
    text: {
        width: 435,
    },
};

class EditSessionForm extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            title: this.props.session.title,
            course: this.props.session.class,
            location: this.props.session.location,
            date: this.props.session.date,
            slots: this.props.session.slots,
            notes: this.props.session.notes,
            tutor: this.props.session.tutor,
            students: this.props.session.students
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    handleDate(ndate) {
        console.log(ndate)
        this.setState({ date: ndate })
    }

    handleSubmit(e) {
        axios.put(`/sessions/${this.props.session._id}`, {
            "title": this.state.title,
            "class": this.state.course,
            "location": this.state.location,
            "date": this.state.date,
            "slots": this.state.slots,
            "notes": this.state.notes,
            "tutor": this.state.tutor,
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    handleRemove = e => {
        axios.delete(`/sessions/${this.props.session._id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();
    };

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

    render() {
        return (
            <main>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                justify="center"
                            >
                                <Grid item>
                                    <IconButton onClick={this.props.disableEditSesh} >
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">
                                        Edit Session
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <form autoComplete="off">
                                <Grid item>
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        spacing={4}
                                    >
                                        <Grid item>
                                            <Typography variant="subtitle1">Session Title *</Typography>
                                            <TextField
                                                required
                                                variant="outlined"
                                                id="standard-required"
                                                type="text"
                                                name="title"
                                                onChange={this.handleInputChange}
                                                value={this.state.title}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        spacing={4}
                                    >
                                        <Grid item>
                                            <Typography variant="subtitle1">Course *</Typography>
                                            <TextField
                                                required
                                                variant="outlined"
                                                id="standard-required"
                                                type="text"
                                                name="course"
                                                onChange={this.handleInputChange}
                                                value={this.state.course}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">Location *</Typography>
                                            <TextField
                                                required
                                                variant="outlined"
                                                id="standard-required"
                                                type="text"
                                                name="location"
                                                onChange={this.handleInputChange}
                                                value={this.state.location}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        spacing={4}
                                    >
                                        <Grid item>
                                            <Typography variant="subtitle1">Study Expert *</Typography>
                                            <TextField
                                                required
                                                variant="outlined"
                                                id="standard-required"
                                                type="text"
                                                name="tutor"
                                                onChange={this.handleInputChange}
                                                value={this.state.tutor}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">Slots *</Typography>
                                            <TextField
                                                required
                                                variant="outlined"
                                                id="standard-required"
                                                inputProps={{ min: this.state.students.length, step: "1" }}
                                                type="number"
                                                name="slots"
                                                onChange={this.handleInputChange}
                                                value={this.state.slots}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container
                                        direction="column"
                                        spacing={4}>
                                        <Grid item>
                                            <Typography variant="subtitle1">Date & Time *</Typography>
                                            <KeyboardDateTimePicker
                                                inputVariant="outlined"
                                                value={this.state.date}
                                                onChange={this.handleDate}
                                                onError={console.log}
                                                disablePast
                                                minDate={new Date()}
                                                format="MM/dd/yyyy hh:mm a"
                                                style={style.text}
                                            />
                                        </Grid >
                                        <Grid item>
                                            <Grid>
                                                <Typography variant="subtitle1">Notes</Typography>
                                                <TextField
                                                    variant="outlined"
                                                    type="text"
                                                    name="notes"
                                                    id="standard-required"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.notes}
                                                />
                                            </Grid >
                                        </Grid>
                                        <Grid item>
                                            <Grid container
                                                alignItems="center"
                                                justify="center"
                                                direction="row"
                                                spacing={5}
                                            >
                                                <Grid item>
                                                    <Button type="submit" variant="contained" color="secondary" size="large" onClick={this.handleSubmit}>Confirm</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" size="large" color="primary" onClick={this.handleClickOpen}>
                                                        Delete
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Dialog
                            open={this.state.setOpen}
                            onClose={this.handleClickClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            unmountOnExit
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure you would like to delete this session?"}</DialogTitle>
                            <DialogContent>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClickClose} color="primary">Back</Button>
                                <Button onClick={this.handleRemove} color="primary" autoFocus>Delete Session</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </MuiPickersUtilsProvider>
            </main>
        )
    }
}
export default EditSessionForm;
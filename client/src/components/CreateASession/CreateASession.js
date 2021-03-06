import React, { useState, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './CreateASession.css';
import { Typography } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

//Calendar component in Create Session component
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

class CreateASession extends Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this); //Handle User Input Entry and save inputs to states
        this.handleSubmit = this.handleSubmit.bind(this); //Handle User Submit Button
        this.handleDate = this.handleDate.bind(this); //Handles calendar input entry and saves input to state
        this.handleClickClose = this.handleClickClose.bind(this); //Create Session confirmation message -> refreshes admin page
        this.state = {
            title: '',
            course: '',
            location: '',
            date: new Date(),
            slots: 0,
            notes: '',
            tutor: '',
            redirectbool: false,
        }
    }

    //Handle User Input Entry and save inputs to states
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    //Handles calendar input entry and saves input to state
    handleDate(ndate) {
        console.log(ndate)
        this.setState({date: ndate})
    }

    //Handle User Submit Button
    handleSubmit(e) {
        axios.post('/sessions', { //axios, performs HTTP post request to add new sessions to database
            "title": this.state.title,
            "class": this.state.course.toUpperCase(),
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
         this.setState({
             setOpen:true, //Opens create session confirmation
         });
         e.preventDefault(); //Prevents instant page refresh when clicking submit button
    }
    
    //Refresh to admin page
    handleClickClose = () => {
        window.location.reload(false);
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
                    style = {{width: 505}}
              
                >
                    <Grid item>
                        <Grid container
                        direction = "row"
                        alignItems="center"
                        justify = "center"
                        >
                            <Grid item>
                                <IconButton onClick={this.props.disableCreateSession} >
                                    <ArrowBackIosIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    Create A Session
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                    {/* Create Session form */}
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
                                        type="number"
                                        inputProps={{ min: "0"}}
                                        name="slots"
                                        onChange={this.handleInputChange}
                                        value={this.state.slots}
                                    />
                                </Grid>
                            </Grid>
                            <Grid  container
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
                                    minDate ={new Date()}
                                    format="MM/dd/yyyy hh:mm a"
                                    style = {style.text}
                                    />
                            </Grid >
                            <Grid item>
                                <Grid>
                                    <Typography variant="subtitle1">Notes</Typography>
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        name="notes"
                                        onChange={this.handleInputChange}
                                        value={this.state.notes}
                                    />
                                </Grid >
                            </Grid>
                            <Grid item>
                                    <Grid container
                                    alignItems = "center"
                                    justify = "center"
                                    >
                                    <Button type="submit" variant="contained" color="secondary" size = "large" onClick={this.handleSubmit}>Confirm</Button>
                                    </Grid>
                                </Grid>
                        </Grid>
                        </Grid>
                    </form>
                    </Grid>
                    {/* Create session confirmation message */}
                    <Dialog
                        open={this.state.setOpen}
                        onClose={this.handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Session Created"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClickClose} color="primary">Ok</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                </MuiPickersUtilsProvider>
            </main>
        )
    }
}
export default CreateASession;
import React, { useState, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from 'axios';

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

class editScreen extends Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.state = {
            title: '',
            course: '',
            location: '',
            date: new Date().toLocaleString(),
            slots: 0,
            notes: ''
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

    handleDate(date) {
        this.setState({date: date})
    }

    handleSubmit(e) {
        axios.post('localhost:5000/sessions', {
            "title": this.state.title,
            "class": this.state.course,
            "location": this.state.location,
            "date": this.state.date,
            "slots": this.state.slots,
            "notes": this.state.notes
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
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
                    spacing={0}
                >
                    <Typography variant="h5" className="center">
                        Create a Session
                    </Typography>
                    <form autoComplete="off">
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={4}
                            >
                                <Grid item>
                                    <Typography variant="subtitle1">Session Title</Typography>
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Required"
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
                                    <Typography variant="subtitle1">Course</Typography>
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Required"
                                        type="text"
                                        name="course"
                                        onChange={this.handleInputChange}
                                        value={this.state.course}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Location</Typography>
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Required"
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
                                    <Typography variant="subtitle1">Date & Time</Typography>
                                    <KeyboardDateTimePicker 
                                    value={this.state.date}
                                    onChange={this.handleDate}
                                    onError={console.log}
                                    disablePast
                                    minDate ={new Date()}
                                    format="MM/dd/yyyy hh:mm a"
                                    label="Required"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Slots</Typography>
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Required"
                                        type="number"
                                        name="slots"
                                        onChange={this.handleInputChange}
                                        value={this.state.slots}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Notes</Typography>
                                <TextField
                                    type="text"
                                    name="notes"
                                    onChange={this.handleInputChange}
                                    value={this.state.notes}
                                />
                            </Grid>
                            <Grid item className="center">
                                <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>Confirm</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                </MuiPickersUtilsProvider>
            </main>
        )
    }
}
export default editScreen;
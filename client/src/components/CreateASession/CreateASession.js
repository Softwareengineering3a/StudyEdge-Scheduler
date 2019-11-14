import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './CreateASession.css';
import { Typography } from '@material-ui/core';
import DatePicker from './DatePicker';


class CreateASession extends Component {
    render(){

        return (
            <main>
                <Grid
                container
                direction="column"
                alignItems="center"
                spacing={0}
                >
                    <Typography variant="h5" className = "center">
                        Create a Session 
                    </Typography>
                <form autoComplete="off">      
                    <Grid item>   
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={0}
                            >
                                <Grid item>
                                    <Typography variant = "subtitle1">Session Title</Typography>
                                    <TextField
                                    required
                                    id="standard-required"
                                    label="Required"
                                    defaultValue="Hello World"
                                    />
                                </Grid>

                            </Grid>
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                            >
                                <Grid item>
                                    <Typography variant = "subtitle1">Course</Typography>
                                    <TextField
                                    required
                                    id="standard-required"
                                    label="Required"
                                    defaultValue="Hello World"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant = "subtitle1">Location</Typography>
                                    <TextField
                                    required
                                    id="standard-required"
                                    label="Required"
                                    defaultValue="Hello World"
                                        />
                                </Grid>
                            </Grid>
                            <Grid container
                                direction="row"
                                spacing={0}
                                >
                                <Grid item>
                                    <Typography variant = "subtitle1">Date</Typography>
                                    <DatePicker></DatePicker>
                                </Grid>
                                <Grid item>
                                <Typography variant = "subtitle1">Slots</Typography>
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Required"
                                    defaultValue="Hello World"
                                />
                                </Grid>
                            </Grid>
                        <Grid item>
                            <Typography variant = "subtitle1">Notes</Typography>
                            <TextField
                                defaultValue="Hello World"
                            />
                        </Grid>
                        <Grid item className = "center">
                            <Button variant="contained" color="secondary">Confirm</Button>
                        </Grid>
                    </Grid>
                </form>
                </Grid>
            </main>
        )
    }
}
export default CreateASession;
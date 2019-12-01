import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';


const style = {
    text: {
      width: 435,
    },
  };


class ConfirmReservation extends Component {
    
 
    render() {
      
        return (
            <main>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={0}
                >
                    <Grid item>
                        <Grid container
                        direction = "row"
                        alignItems="center"
                        >
                            <Grid item>
                                <IconButton onClick={this.props.disableReservation} >
                                    <ArrowBackIosIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" className="center">
                                    Enter Details
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
                                         variant = "outlined"
                                         id="outlined-required"
                                         type = "text"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Last Name *</Typography>
                                    <TextField
                                        required
                                        variant = "outlined"
                                        id="standard-required"
                                        type="text"
                                        name="title"
                                    />
                                </Grid>


                            </Grid>
                            <Grid
                                container
                                direction="row"
                                spacing={4}
                            >
                                <Grid item>
                                    <Typography variant="subtitle1">Email *</Typography>
                                    <TextField
                                        required
                                        variant = "outlined"
                                        id="standard-required"
                                        type="text"
                                        name="course"
                                        style = {style.text}
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
                                    variant = "outlined"
                                    id="standard-required"
                                    type="text"
                                    name="notes"
                                    style = {style.text}
                                />
                                </Grid>
                            </Grid>
                            <Grid  container
                                direction="column"
                                spacing={4}
                                alignItems = "center">
                                <Grid item >
                                    <Button type="submit" variant="contained" color="secondary">Reserve</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                    </Grid>
                </Grid>
            </main>
        )
    }
}
export default ConfirmReservation;
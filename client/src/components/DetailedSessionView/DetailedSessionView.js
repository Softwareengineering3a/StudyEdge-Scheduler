import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


class DetailedSessionView extends Component {
    
    render() {
        var myReservation = this.props.myReservation;
     myReservation = myReservation.filter(function(item) {
         return item.id === 1;
        }).map(function({date,time,course,title,location,slots}){

            return {date,time,course,title,location,slots};
     });
     console.log(myReservation)
     return(
        <Grid container  
            direction="column"
            alignItems="center"
            justify = "center"
            spacing={0}
            >
                <Grid item>
                    <Typography variant = 'h5'> Session Details </Typography>
                </Grid>
            <Card>
            <Grid item
            >
                    <Grid>Course</Grid>
                    <Grid>Title</Grid>
                    <Grid>Location</Grid>
                    <Grid>Time</Grid>
                    <Grid>Slots</Grid>
                    <Grid>Notes</Grid>
            </Grid>
            </Card>    
            <Grid container
            direction="row"
            spacing={0}> 
            <Grid item>
            <Button variant="contained">
            Edit Session
            </Button>
            </Grid> 
            <Grid item>
            <Button variant="contained">
            Delete
            </Button>
            </Grid> 
            </Grid> 
        </Grid>
     );
  
    }
}

export default DetailedSessionView;
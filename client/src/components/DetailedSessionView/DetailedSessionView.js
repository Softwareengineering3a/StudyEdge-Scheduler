import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


class DetailedSessionView extends Component {
    
    render() {
       const id = this.props.id
        let myReservation = this.props.myReservation || {}
        myReservation = myReservation.filter(function(item) {
            return item.id === id;
        }).map(function(session){    
            return (
                session
            )
     })

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
                    <Grid item>
                        { myReservation.map((item, index) => 
                        <Grid>
                            <Grid key={index}>{item.title}</Grid>
                            <Grid key={index}>{item.course}</Grid>
                            <Grid key={index}>{item.location}</Grid>
                            <Grid key={index}>{item.time}</Grid>
                            <Grid key={index}>{item.slots}</Grid>
                        </Grid>
                        )} 
                    </Grid>
                </Card>    
            <Grid container
                direction="row"
                spacing={0}
            > 
                <Grid item>
                    <Button variant="contained">
                        Edit
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
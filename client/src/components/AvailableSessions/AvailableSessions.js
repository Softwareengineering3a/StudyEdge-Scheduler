import React,{Component} from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'

class AvailableSessions extends Component {
    render(){

        const myReservation = [{
            id: 1,
            date : "11/7/2019",
            time : 1300,
            class : "CHM2045",
            title : "Exam 3 Review",
            location : "CSE352",
            slots: 10
        },
        {   id: 2,
            date : "11/7/2019",
            time : 1320,
            class : "MAC2313",
            title : "Exam 2 Review",
            location : "CSE352",
            slots: 15
        },
        {
            id: 3,
            date : "11/7/2019",
            time : 1300,
            class : "MAC2313",
            title : "Exam 2 Review",
            location : "CSE352",
            slots: 15
        }
        ]
        const listSessions = myReservation.map((session) =>
        <Grid container
        direction="column"
        alignItems="center"
        justify = "center"
        spacing={0}>
        <Button variant="outlined" color="primary" key={session.id}>
            <Grid item>
            <Grid>{session.class}</Grid>
            <Grid>{session.title}</Grid>
            <Grid>{session.location}</Grid>
            <Grid>{session.time}</Grid>
            <Grid>{session.slots}</Grid>
            </Grid>
        </Button>
        </Grid>
      );

        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justify = "center"
                spacing={4}>
                <Grid item>
                <Typography variant="h5" className = "center">
                    Available Sessions 
                </Typography>
                </Grid>
                <Grid item> 
                    {listSessions}
                </Grid>
            </Grid>
        );
    }
}

export default AvailableSessions;
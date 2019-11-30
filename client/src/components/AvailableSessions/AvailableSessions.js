import React,{Component} from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'

const dateCleaner = (date) => {
    var dateString = (date.getMonth() + 1).toString() + "/";
    dateString += (date.getDate()).toString() + "/";
    dateString += (date.getFullYear().toString());
    return dateString;
}
class AvailableSessions extends Component {
    render(){
        const myReservations = this.props.sessions
        .filter(reservation=>{
            var temp = "\"" + reservation.date + "\""
            var dateStr = JSON.parse(temp);  
            var date = new Date(dateStr);
            var date1 = dateCleaner(date)
            var date2 = dateCleaner(this.props.date)
            return date1 === date2 && reservation.class === this.props.class
            
        })
        .map((session) =>
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
                    {myReservations}
                </Grid>
            </Grid>
        );
    }
}

export default AvailableSessions;
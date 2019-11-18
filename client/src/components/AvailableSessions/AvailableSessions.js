import React,{Component} from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DetailedSessionView from '../DetailedSessionView/DetailedSessionView';


class AvailableSessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateSession: false,
        };
        this.displayCreateSession = this.displayCreateSession.bind(this);
    }
    
    displayCreateSession = (id) => () => {
        this.setState({
            showCreateSession: true,
            modelId: id
        });
    }

    render(){

        const myReservation = [{
            id: 1,
            date : "11/6/2019",
            time : 1300,
            course : "CHM2045",
            title : "Exam 3 Review",
            location : "CSE352",
            slots: 10
        },
        {   id: 2,
            date : "11/7/2019",
            time : 1320,
            course : "MAC2313",
            title : "Exam 2 Review",
            location : "CSE352",
            slots: 15
        },
        {
            id: 3,
            date : "11/7/2019",
            time : 1300,
            course : "MAC2313",
            title : "Exam 2 Review",
            location : "CSE352",
            slots: 15
        }
        ]
        const listSessions = myReservation.map((session, index) =>
            <Grid container  
                direction="column"
                alignItems="center"
                justify = "center"
                spacing={0}
                key={index}
                >
                <Button variant="outlined" color="primary" key={index} onClick = {this.displayCreateSession(session.id)}>
                    <Grid item>
                    <Grid>{session.course}</Grid>
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
                spacing={0}>
            <Grid item>
            {this.state.showCreateSession ?
            <DetailedSessionView myReservation = {myReservation} id={this.state.modelId} /> :
                <Grid item>
                 <Typography variant="h5" className = "center">
                    Available Sessions 
                </Typography>
                {listSessions}
                </Grid>}
            </Grid>
        </Grid>
        );
    }
}

export default AvailableSessions;
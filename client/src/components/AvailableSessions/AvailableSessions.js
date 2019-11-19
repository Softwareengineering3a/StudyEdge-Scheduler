import React,{Component} from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DetailedSessionView from '../DetailedSessionView/DetailedSessionView';


class AvailableSessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetailedSession: false,
        };
        this.displayDetailedSession = this.displayDetailedSession.bind(this);
    }
    
    displayDetailedSession = (id) => () => {
        this.setState({
            showDetailedSession: true,
            sessionId: id
        });
    }

    render(){

        const mySessions = [{
            id: 1,
            date : "11/6/2019",
            time : 1300,
            course : "CHM2045",
            title : "Exam 3 Review",
            location : "CSE352",
            notes: "ay",
            slots: 10
        },
        {   id: 2,
            date : "11/7/2019",
            time : 1320,
            course : "MAC2313",
            title : "Exam 2 Review",
            location : "CSE352",
            notes: "ayyy",
            slots: 15
        },
        {
            id: 3,
            date : "11/7/2019",
            time : 1300,
            course : "MAC2312",
            title : "Exam 2 Review",
            location : "Marston",
            notes: "ayyyyyyy",
            slots: 15
        }
        ]
        const listSessions = mySessions.map((session, index) =>
            <Grid container  
                direction="column"
                alignItems="center"
                justify = "center"
                spacing={0}
                key={index}
                >
                <Button variant="outlined" color="primary" key={index} onClick = {this.displayDetailedSession(session.id)}>
                    <Grid item>
                    <Grid>{session.course}</Grid>
                    <Grid>{session.title}</Grid>
                    <Grid>{session.location}</Grid>
                    <Grid>{session.time}</Grid>
                    <Grid container justify = "flex-end">{session.slots}</Grid>
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
                    {this.state.showDetailedSession ?
                    <DetailedSessionView mySessions = {mySessions} id={this.state.sessionId} /> :
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
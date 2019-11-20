import React,{Component} from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DetailedSessionView from '../DetailedSessionView/DetailedSessionView';

const style = {
    button: {
      margin: 'auto',
      width: 200,
      
    },
  };


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
            time : "3:30 PM",
            course : "CHM2045",
            title : "Exam 3 Review",
            location : "CSE352",
            notes: "Meet in Marston Library, Bring pens and pencils.",
            slots: 10,
            slotsFilled: 8
        },
        {   id: 2,
            date : "11/7/2019",
            time : "4:00 PM",
            course : "MAC2313",
            title : "Exam 2 Review",
            location : "CSE352",
            notes: "Blah blah blah blah blah",
            slots: 15,
            slotsFilled: 10
        },
        {
            id: 3,
            date : "11/7/2019",
            time : "5:00 PM",
            course : "MAC2312",
            title : "Exam 2 Review",
            location : "Marston Library",
            notes: "Meet in Basement",
            slots: 15,
            slotsFilled: 9
        }
        ]
        const listSessions = mySessions.map((session, index) =>
            <Grid container  
                direction="column"
                alignItems="center"
                justify = "center"
                spacing={4}
                key={index}
            >
                    <Grid item>
                        <Button variant="outlined" color="primary" key={index} style = {style.button} onClick = {this.displayDetailedSession(session.id)}>
                            <Grid item>
                                <Grid>{session.course}</Grid>
                                <Grid>{session.title}</Grid>
                                <Grid>{session.location}</Grid>
                                <Grid>{session.time}</Grid>
                                <Grid container justify = "flex-end">{session.slotsFilled}/{session.slots}</Grid>
                            </Grid>
                        </Button>
                    </Grid>
            </Grid>
        );
        return (
                   <Grid>
                        {this.state.showDetailedSession ?
                        <DetailedSessionView mySessions = {mySessions} id={this.state.sessionId} /> :
                        <Grid container
                            direction="column"
                            alignItems="center"
                            justify = "center"
                            spacing={2}
                        >
                            <Grid item>
                            <Typography variant="h5" className = "center">
                            Available Sessions 
                            </Typography>
                            </Grid>
                            <Grid item>
                            {listSessions}
                            </Grid>
                        </Grid>}
                     </Grid>
        );
    }
}

export default AvailableSessions;
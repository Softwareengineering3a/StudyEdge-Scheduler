import React, { Component } from 'react';
import './admin.css';
import SelectACourse from '../../components/SelectACourse/SelectACourse';
import CreateASession from '../../components/CreateASession/CreateASession';
import AvailableSessions from '../../components/AvailableSessions/AvailableSessions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import StaticDatePicker from './StaticDatePicker';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../../components/SelectACourse/SelectACourse.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

const style = {
    card: {
        display: 'inline-block',
        height: 750,
        width: 1000
    },
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            showCreateSession: false,
            controlledDate: null,
            sessions: [],
            class: "",
            first: true
        };
        this.displayCreateSession = this.displayCreateSession.bind(this);  //Shows Create Session component
    }

    //Calendar date filter update
    dateUpdate = (ndate) => {
        this.setState({
            date: ndate
        })
    }  

    //Course filter update
    classUpdate = (nclass) => {
        this.setState({
            class: nclass
        })
    } 
    
    //Saves session as a state
    updateSessions = (sess) => {
        this.setState({
            sessions: sess
        })
    }

    //Updates calendar
    updateFirst = () => {
        this.setState({
            first: false
        })
    }

    //Shows Create Session component
    displayCreateSession = () => {
        this.setState({
            showCreateSession: true
        });
    }

    //Hides Create Sesssion component
    disableCreateSession = () => {
        this.setState({
            showCreateSession: false
        });
    }

    //Hides Detailed Session component
    disableDetailedSession = () => {
        this.setState({
            showDetailedSession: false
        });
    }

    //Loads session using HTTP GET request using axios
    handleLoad = () => {
        axios.get('/sessions')
        .then((response) => {
            this.updateSessions(response.data)
        })
        .catch((error)=>{
            console.log(error)
        }); 
    }

    componentDidMount() { window.addEventListener('load', this.handleLoad)}

    componentWillUnmount() { window.removeEventListener('load', this.handleLoad) }

    render(){
        
        const theme = createMuiTheme({
            palette: {
              primary: { main: '#039be5' }, 
              secondary: { main: '#43a047' }, 
            },
        });

        //Allows for admin to click on overbooked session even when students are prevented
        //Checks if admin web token is saved to local storage (is admin logged in?)
        try {
            var token = localStorage.getItem('jwtToken');
            var decoded = jwt_decode(token);
        } catch (error) {
            return(
                <Redirect to={{
                    pathname: '/login/admin',
                }}
                />
            );
        }
        //Prevents students from accessing admin page
        if(decoded.username !== "admin"){
            return(
                <Redirect to={{
                    pathname: '/login/admin',
                }}
                />
            );
        }

        return (
            <main>
                <ThemeProvider theme={theme}>
                    <Grid container   
                    justify="center"
                    alignItems="center" 
                    style = {{height: 850}}
                    >
                        <Grid item>
                            <Card style = {style.card}>
                                <Grid >
                                    <Grid container
                                        direction = "row"
                                        justify = "center"
                                        alignItems = "center"
                                    >
                                        <Grid
                                            item
                                            container
                                            direction = "row"
                                                spacing = {10}
                                        >
                                            <Grid item style={{ position: 'relative', zIndex: 1}}>
                                                <Grid item container justify = "flex-start">
                                                    {/* drop down component */}
                                                    <SelectACourse
                                                        sessions = {this.state.sessions}
                                                        classUpdate = {this.classUpdate.bind(this)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                {/* Add button to create sessions, only available to admin */}
                                                <Fab size="small" color="secondary" aria-label="add" onClick={this.displayCreateSession} >
                                                    <AddIcon/>
                                                </Fab>
                                            </Grid>
                                        </Grid>
                                    <Grid
                                        item
                                        container
                                        direction = "row"
                                        spacing = {9}
                                        justify = "center"
                                        alignItems = "center"

                                    >
                                        <Grid item
                                            style={{height:200}}
                                            >
                                            {/* calendar component */}
                                            <StaticDatePicker
                                                date = {this.state.date}
                                                sessions = {this.state.sessions}
                                                class = {this.state.class}
                                                dateUpdate= {this.dateUpdate.bind(this)}
                                                updateSessions = {this.updateSessions.bind(this)}
                                                updateFirst = {this.updateFirst.bind(this)}
                                                />
                                        </Grid>        
                                            <Grid item
                                            style={{height:600}} >             
                                                <CardContent>
                                                    {this.state.showCreateSession ?
                                                        /* create session component */
                                                        <CreateASession
                                                        disableCreateSession = {this.disableCreateSession} 
                                                        /> :
                                                        /* available session component */
                                                        <AvailableSessions
                                                        date = {this.state.date}
                                                        sessions = {this.state.sessions}
                                                        class = {this.state.class}
                                                        first = {this.state.first}
                                                        disableDetailedSession = {this.disableDetailedSession}>
                                                        </AvailableSessions>
                                                    }
                                                </CardContent>
                                            </Grid>   
                                        </Grid>
                                    </Grid>  
                                </Grid>                  
                            </Card>
                        </Grid>
                    </Grid>   
                </ThemeProvider>
            </main>
        );
    }
}

export default Home;
import React, { Component } from 'react';
import './student.css';
import SelectACourse from '../../components/SelectACourse/SelectACourse';
import CreateASession from '../../components/CreateASession/CreateASession';
import AvailableSessions from '../../components/AvailableSessions/AvailableSessions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import StaticDatePicker from './StaticDatePicker';
import '../../components/SelectACourse/SelectACourse.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const style = {
    card: {
        display: 'inline-block',
        height: 750,
        width: 1000,
    },
};

class Home extends Component {

    constructor(props) {
        super(props);
        try {
            this.state = {
                date: new Date(),
                showCreateSession: false,
                user: this.props.location.state.id,
                controlledDate: null,
                sessions: [],
                class: "",
                first: true
            };
        } catch (error) {
            this.state = {
                user: '',
            };
        }

        this.displayCreateSession = this.displayCreateSession.bind(this);  
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

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: { main: '#039be5' },
                secondary: { main: '#43a047' },
            },
        });

        //Student must be logged in with some sort of string
        if(this.state.user === ""){
            return(
                <Redirect to={{
                    pathname: '/loginfail',
                }}
                />
            )
        }
        else {
            //If student is detected, then remove admin token if admin was signed in
            localStorage.removeItem('jwtToken');
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
                                                        sessions = {this.state.sessions} classUpdate = {this.classUpdate.bind(this)}
                                                    />
                                                </Grid>
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
                                            justify = "center"
                                            alignItems = "center">
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
                                                        <CreateASession
                                                        disableCreateSession = {this.disableCreateSession} 
                                                        /> :
                                                        /* available session component */
                                                        <AvailableSessions
                                                        date = {this.state.date}
                                                        sessions = {this.state.sessions}
                                                        class = {this.state.class}
                                                        disableDetailedSession = {this.disableDetailedSession}
                                                        user = {this.state.user}
                                                        first = {this.state.first}
                                                        />
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

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

    dateUpdate = (ndate) => {
        this.setState({
            date: ndate
        })
    }  

    classUpdate = (nclass) => {
        this.setState({
            class: nclass
        })
    } 
    
    updateSessions = (sess) => {
        this.setState({
            sessions: sess
        })
    }

    updateFirst = () => {
        this.setState({
            first: false
        })
    }

    displayCreateSession = () => {
        this.setState({
            showCreateSession: true
        });
    }
    disableCreateSession = () => {
        this.setState({
            showCreateSession: false
        });
    }

    disableDetailedSession = () => {
        this.setState({
            showDetailedSession: false
        });
    }
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

        if(this.state.user === ""){
            return(
                <Redirect to={{
                    pathname: '/loginfail',
                }}
                />
            )
        }
        else {
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

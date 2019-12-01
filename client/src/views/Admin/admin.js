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
    }
};


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            showCreateSession: false,
            admin: true,
            controlledDate: null,
            sessions: [],
            class: ""
        };
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
        console.log(nclass)
    } 
    
    updateSessions = (sess) => {
        this.setState({
            sessions: sess
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
        
        axios.get('http://localhost:5000/sessions')
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


        if(decoded.username != "admin"){
            return(
                <Redirect to={{
                    pathname: '/login/admin',
                }}
                />
            );
        }

        return (
            <main>
                {/* NEXT LINE FOR TESTING PURPOSES  */}
                <div className="center"><h2>Admin</h2></div>
                <ThemeProvider theme={theme}>
                    <Grid container
                        justify="center"
                        alignItems="center"
                        spacing={0}
                        >  
                            <Grid item >
                                <CardContent >
                                    <Grid style={{ position: 'absolute', zIndex: 1}}>
                                        <SelectACourse
                                            sessions = {this.state.sessions}
                                            classUpdate = {this.classUpdate.bind(this)}
                                        ></SelectACourse>
                                    </Grid>
                                        <Fab className = "CreateButton" size="small" color="secondary" aria-label="add" onClick={this.displayCreateSession} >
                                            <AddIcon/>
                                        </Fab>

                                        <StaticDatePicker
                                            date = {this.state.date}
                                            dateUpdate= {this.dateUpdate.bind(this)}
                                            updateSessions = {this.updateSessions.bind(this)}
                                        ></StaticDatePicker>
                                </CardContent> 
                            </Grid>           
                            <Grid item >             
                                <CardContent>
                                    {this.state.showCreateSession ?
                                            <CreateASession
                                            disableCreateSession = {this.disableCreateSession} 
                                            /> :
                                            <AvailableSessions
                                            date = {this.state.date}
                                            sessions = {this.state.sessions}
                                            class = {this.state.class}
                                            disableDetailedSession = {this.disableDetailedSession}>
                                            </AvailableSessions>
                                            }
                                </CardContent>
                            </Grid>                   
                    </Grid>               
                </ThemeProvider>
            </main>
        );
    }
}

export default Home;
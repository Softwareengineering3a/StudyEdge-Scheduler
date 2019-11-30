
import React, {Component} from 'react';
import './Home.css';
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
import axios from "axios"

class Home extends Component {
    constructor(props){
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
        this.getDay = this.getDay;       
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
            showCreateSession: true,
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
        return (
            <main>
            <ThemeProvider theme={theme}>
                <Grid container   
                justify="center"
                alignItems="center"
                >
                    <Card style = {{display: 'inline-block'}}>
                        <Grid container
                        direction="row"
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
                                            <CreateASession /> :
                                            null
                                            }
                                    <AvailableSessions
                                        date = {this.state.date}
                                        sessions = {this.state.sessions}
                                        class = {this.state.class}
                                    ></AvailableSessions>
                                </CardContent>
                            </Grid> 
                        </Grid>                     
                    </Card>
                </Grid>   
                </ThemeProvider>
            </main>
        );
    }
}

export default Home;
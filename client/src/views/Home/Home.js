import React, { Component } from 'react';
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
import axios from 'axios';


class Home extends Component {
    state= {
        sessionsA: null
    }
    listSessions = (e) => {
        axios.get('http://localhost:5000/sessions')
            .then((res) => { 
                const sesh = res.data;
                console.log(sesh);
                this.setSate({sessionsA: sesh});
            })
    }


    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            showCreateSession: false,
            admin: true,
            controlledDate: null,
        };
        this.displayCreateSession = this.displayCreateSession.bind(this);
    }

    displayCreateSession = () => {
        this.setState({
            showCreateSession: true,
        });
    }

    render() {

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
                        <Card style={{ display: 'inline-block' }}>
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={0}
                            >
                                <Grid item >
                                    <CardContent >
                                        <Grid style={{ position: 'absolute', zIndex: 1 }}>
                                            <SelectACourse></SelectACourse>
                                        </Grid>
                                        <Fab className="CreateButton" size="small" color="secondary" aria-label="add" onClick={this.displayCreateSession} onDoubleClick="disable" >
                                            <AddIcon />
                                        </Fab>
                                        <StaticDatePicker onClick ={this.listSessions} />
                                    </CardContent>
                                </Grid>
                                <Grid item >
                                    <CardContent>
                                        {this.state.showCreateSession ?
                                            <CreateASession /> :
                                            <AvailableSessions />
                                        }
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

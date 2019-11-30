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
                    >
                        <Card style={style.card}>
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
                                            <CreateASession user={this.state.user}/> :
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

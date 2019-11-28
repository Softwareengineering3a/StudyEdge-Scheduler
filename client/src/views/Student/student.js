import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
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

const style = {
    card: {
      display: 'inline-block',
    }
  };

//user: this.props.location.state.id,

class Home extends Component {

    constructor(props) {
        super(props);
        try {
            this.state = {
                date: new Date(),
                showCreateSession: false,
                admin: true,
                controlledDate: null,
                user: this.props.location.state.id,
            };
        } catch (error) {
            this.state={
                user:""
            }
        }
    }

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: { main: '#039be5' },
                secondary: { main: '#43a047' },
            },
        });

        if(this.state.user == ""){
            return(
                <Redirect to={{
                    pathname: '/loginfail',
                }}
                />
            )
        }        

        return (
            <main>
                {/* NEXT LINE FOR TESTING PURPOSES  */}
                <div className="center"><h2>Student: {this.state.user}</h2></div>
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
                                        <Grid style={{ position: 'relative', zIndex: 1 }}>
                                            <SelectACourse></SelectACourse>
                                        </Grid>
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

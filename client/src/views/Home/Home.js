import React, {Component} from 'react';
import './Home.css';
import SelectACourse from '../../components/SelectACourse/SelectACourse';
import CreateASession from '../../components/CreateASession/CreateASession';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import StaticDatePicker from './StaticDatePicker';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../../components/SelectACourse/SelectACourse.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


class Home extends Component {
    
    

    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            showCreateSession: false,
        };
        this.displayCreateSession = this.displayCreateSession.bind(this);
    }

    dateUpdate(date){
        this.setState({date: date})
        if(date){
            console.log(date);
        }
    }

    displayCreateSession = () => {
        this.setState({
            showCreateSession: true,
        });
    }

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
                                    <Grid style={{ position: 'absolute'}}>
                                        <SelectACourse style={{ zIndex: 1 }}></SelectACourse>
                                    </Grid>
                                        <Fab className = "CreateButton" size="small" color="secondary" aria-label="add" onClick={this.displayCreateSession} >
                                            <AddIcon/>
                                        </Fab>

                                        <StaticDatePicker></StaticDatePicker>
                                </CardContent> 
                            </Grid>           
                            <Grid item >             
                                <CardContent>
                                    {this.state.showCreateSession ?
                                            <CreateASession /> :
                                            null
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

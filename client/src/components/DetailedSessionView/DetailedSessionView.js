import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { DateTime } from "luxon"; 

const style = {
    bg: {
      backgroundColor: '#757575',
      color: 'white',
      margin: 'auto',
      width: 300,
    },
  };

class DetailedSessionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmed: false,
        };
    }
    
    render() {
          
        let mySessions = this.props.session;

        return(
            <Grid container  
                direction="column"
                alignItems="center"
                justify = "center"
                spacing={2}
            >
                <Grid item>
                    <Typography variant = 'h5'> Session Details </Typography>
                </Grid>
                <Card  style = {style.bg}>
                    <Grid >
                        <Grid container  
                            direction="column"
                            spacing={1}
                        >
                            <Grid item>
                                <Grid container  
                                    direction="column"
                                    alignItems="center"
                                    justify = "center"
                                    spacing={0}
                                >
                                    <Grid>
                                        <Typography variant =  "button">{mySessions.class}</Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant = "button">{mySessions.title}</Typography>
                                    
                                    </Grid>
                                    <Grid>
                                        <Typography variant =  "button">{mySessions.location}</Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant =  "button">{DateTime.fromISO(mySessions.date).toFormat('ff')}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container  
                                    direction="column"
                                    alignItems="center"
                                    justify = "center"
                                    spacing={0} 
                                >
                                    <Grid>
                                        <Typography  variant =  "button">Note: </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography  variant =  "button">{mySessions.notes}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justify = "flex-end"> 
                                    <Typography variant =  "body1">{mySessions.students.length}/{mySessions.slots}</Typography>
                                </Grid>
                            </Grid> 
                        </Grid>  
                    </Grid>      
                </Card>          
                <Grid item>
                <Grid container
                    direction="row"
                    spacing={4}
                > 
                    <Grid item>
                        <Button variant="contained"color="secondary">
                            Edit
                        </Button>
                    </Grid> 
                </Grid> 
                </Grid>
                <Grid item>
                    <Button variant="contained" color = "primary"  endIcon={<Icon>send</Icon>}>
                        Notify 
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default DetailedSessionView;
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const style = {
    bg: {
      backgroundColor: '#757575',
      color: 'white',
      margin: 'auto',
      width: 300,
    },
  };


class DetailedSessionView extends Component {
    
    render() {
          
       const id = this.props.id
        let mySessions = this.props.mySessions || {}
        mySessions = mySessions.filter(function(session) {
            return session.id === id;
        }).map(function(session){    
            return (
                session
            )
     })

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
            { mySessions.map((filteredSession, index) =>
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
                                <Grid key={index}>
                                    <Typography variant =  "button">{filteredSession.course}</Typography>
                                </Grid>
                                <Grid key={index}>
                                    <Typography variant = "button">{filteredSession.title}</Typography>
                                
                                </Grid>
                                <Grid key={index}>
                                    <Typography variant =  "button">{filteredSession.location}</Typography>
                                </Grid>
                                <Grid key={index}>
                                    <Typography variant =  "button">{filteredSession.time}</Typography>
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
                                <Grid key={index}>
                                    <Typography  variant =  "button">Note: </Typography>
                                </Grid>
                                <Grid key={index} >
                                    <Typography  variant =  "button">{filteredSession.notes}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container justify = "flex-end"  key={index}> 
                                <Typography variant =  "body1">{filteredSession.slotsFilled}/{filteredSession.slots}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>  
                </Grid>      
                        )}
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
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
    withStyles,
    MuiThemeProvider
  } from "@material-ui/core/styles";
import Icon from '@material-ui/core/Icon';



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
            spacing={4}
        >
                <Grid item>
                    <Typography variant = 'h5'> Session Details </Typography>
                </Grid>
                    <Grid item >
                        { mySessions.map((filteredSession, index) =>
                        <Card color = "primary">
                        <Grid container  
                        direction="column"
                        alignItems="center"
                        justify = "center"
                        spacing={0}>
                            <Grid item key={index}>
                                <Typography variant = "h6">{filteredSession.title}</Typography>
                            </Grid>
                            <Grid item key={index}>
                                <Typography variant =  "button">{filteredSession.course}</Typography>
                            </Grid>
                            <Grid item key={index}>
                                <Typography variant =  "button">{filteredSession.location}</Typography>
                            </Grid>
                            <Grid item key={index}>
                                <Typography variant =  "button">{filteredSession.time}</Typography>
                                </Grid>
                            <Grid item key={index}>
                                <Typography  variant =  "button">{filteredSession.notes}</Typography>
                            </Grid>
                            <Grid container justify = "flex-end" alignItems = "center" key={index}>
                                <Typography variant =  "button">{filteredSession.slots}</Typography>
                            </Grid>
                            </Grid> 
                            </Card>    
                        )} 
                         </Grid>   
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
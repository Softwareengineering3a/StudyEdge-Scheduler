import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

class adminlogin extends Component {
    render(){
        return(
            <main>
                <div className="center">
                    <h2>Login:</h2>
                    <Grid item>
                        <TextField
                            required
                            id="standard-required"
                            label="Password"
                            type="password"
                            name="password"
                        />
                    </Grid>
                </div>
            </main>
        );
    }

}

export default adminlogin;
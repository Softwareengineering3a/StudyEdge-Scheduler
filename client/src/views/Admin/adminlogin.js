import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Card from '@material-ui/core/Card';

class adminlogin extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: 'admin',
            password: '',
        }


    }

    handleSubmit(e){
        const { username, password } = this.state;

        axios.post('/auth/login', { username, password })
        .then((result) => {
          localStorage.setItem('jwtToken', result.data.token);
          this.props.history.push('/admin')
        })
        .catch((error) => {
          if(error.response.status === 401) {
            //this.setState({ message: 'Login failed. Username or password not match' });
          }
        });
    }    

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <main>
                <Grid container
                    justify="center"
                    alignItems = "center"
                    direction = "column"
                    style = {{height: 500}}
                    >
                <Grid item>
                <Card style = {{display: 'inline-block', height: 300, width: 500}}>
                    <Grid item>
                        <Typography variant="h5" className = "center">
                            Welcome to Study Edge Scheduler
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1" className = "center">
                        Please Enter Your Password
                    </Typography>
                    </Grid>
                    <Grid item 
                        container
                        justify="center"
                        alignItems = "center"
                        direction = "column"
                        spacing = {4}
                     >
                        <Grid item>
                        <TextField
                            required
                            id="standard-required"
                            label="Password"
                            type="password"
                            name="password"
                            variant = "outlined"
                            onChange={this.handleChange}
                            value={this.state.location}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>Enter</Button>
                        </Grid>
                    </Grid>
                </Card>
                    </Grid>
                </Grid>
            </main>
        );
    }

}

export default adminlogin;

//Source: https://www.djamware.com/post/5a90c37980aca7059c14297a/securing-mern-stack-web-application-using-passport#install-express